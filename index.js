const fs = require('fs')
const telegramBot = require('node-telegram-bot-api')
const fileUtils = require('./utils/file')

const CONFIG = require('./config')

const _isOwner = (fromId) => {
  return fromId === parseInt(CONFIG.OWNER_CHAT_ID, 10)
}

let bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true })

bot.onText(/\/test/, (msg, match) => {
  if (_isOwner(msg.from.id)) {
    bot.sendMessage(msg.from.id, `Hi, ${msg.from.first_name}! I'm okay!`)
  }
})

bot.onText(/\/add (\d+)/, (msg, match) => {
  if (_isOwner(msg.from.id)) {
    let fileData = fileUtils.getFileData()
    const IMAGE = parseInt(match[1], 10)
    const isImageExist = fileData.images.includes(IMAGE)

    if (!isImageExist) {
      fileData.images = fileData.images.push(IMAGE)
      fileUtils.writeFile(fileData)
      bot.sendMessage(msg.from.id, `I've added image #${IMAGE} to array of posted images`)

    } else {
      bot.sendMessage(msg.from.id, `Image #${IMAGE} already exist in array of posted images`)
    }
  }
})

bot.onText(/\/delete (\d+)/, (msg, match) => {
  if (_isOwner(msg.from.id)) {
    let fileData = fileUtils.getFileData()
    const IMAGE = parseInt(match[1], 10)
    const isImageExist = fileData.images.includes(IMAGE)

    if (isImageExist) {
      fileData.images = fileData.images.filter(image => image !== IMAGE)
      fileUtils.writeFile(fileData)
      bot.sendMessage(msg.from.id, `I've deleted image #${IMAGE} from array of posted images`)

    } else {
      bot.sendMessage(msg.from.id, `Image #${IMAGE} doesn't exist in array of posted images`)
    }
  }
})
