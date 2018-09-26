const telegramBot = require('node-telegram-bot-api')
const moment = require('moment')
const fileUtils = require('./utils/file')

const CONFIG = require('./config')
const DAY_OF_YEAR = moment().dayOfYear()

let bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true })
let fileData = fileUtils.getFileData()
const stream = fileUtils.getFileStream()

bot.sendPhoto(CONFIG.CHAT_ID, stream)
fileData.images.push(DAY_OF_YEAR)
fileUtils.writeFile(fileData)
