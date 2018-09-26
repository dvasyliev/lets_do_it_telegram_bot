const telegramBot = require('node-telegram-bot-api')
const commands = require('./commands')
const CONFIG = require('./config')

let bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true })

commands.publishImage(bot)
