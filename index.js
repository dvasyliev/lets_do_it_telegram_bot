const fs = require('fs')
const telegramBot = require('node-telegram-bot-api')
const moment = require('moment')

const CONFIG = require('./config')
const FILE_NAME = `./posts/${new Date().getFullYear()}.json`

let bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true })

const _isOwner = (fromId) => {
  return fromId === parseInt(CONFIG.OWNER_CHAT_ID, 10)
}

// create './posts/[current_year].json' file
// with empty images array, if the file isn't exist
if (!fs.existsSync(FILE_NAME)) {
  fs.mkdirSync('posts')
  fs.appendFileSync(FILE_NAME, JSON.stringify({ images: [] }))
}

// read the file and parse data
let fileData = JSON.parse(fs.readFileSync(FILE_NAME, 'utf8'))

bot.onText(/\/start/, (msg, match) => {
  const IMAGE_SEND_TIME = '08:00'
  const DAY_OF_YEAR = moment().dayOfYear()
  let isImageSent = fileData.images.includes(DAY_OF_YEAR)

  setInterval(() => {
    const DAY_OF_YEAR = moment().dayOfYear()
    const CURRENT_TIME = `${new Date().getHours()}:${new Date().getMinutes()}`

    if (IMAGE_SEND_TIME <= CURRENT_TIME) {
      if (!isImageSent) {
        const stream = fs.createReadStream(`./assets/images/${DAY_OF_YEAR}.jpg`)

        bot.sendPhoto(CONFIG.CHAT_ID, stream)
        isImageSent = true
        fileData.images.push(DAY_OF_YEAR)
        // rewrite the file data
        fs.writeFileSync(FILE_NAME, JSON.stringify(fileData))
      }

    } else if (isImageSent) {
      isImageSent = false
    }
  }, 30000)
})

bot.onText(/\/test/, (msg, match) => {
  if (_isOwner(msg.from.id)) {
    bot.sendMessage(msg.from.id, `Hi, ${msg.from.first_name}! I'm okay!`)
  }
})

bot.onText(/\/delete (\d+)/, (msg, match) => {
  if (_isOwner(msg.from.id)) {
    const IMAGE = parseInt(match[1], 10)
    const DAY_OF_YEAR = moment().dayOfYear()
    const isImageExist = fileData.images.includes(IMAGE)

    if (isImageExist) {
      fileData.images = fileData.images.filter(image => image !== IMAGE)
      fs.writeFileSync(FILE_NAME, JSON.stringify(fileData))
      bot.sendMessage(msg.from.id, `I've deleted image #${IMAGE} from array of posted images`)

    } else {
      bot.sendMessage(msg.from.id, `Image #${IMAGE} doesn't exist in array of posted images`)
    }
  }
})
