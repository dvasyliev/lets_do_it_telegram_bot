const telegramBot = require('node-telegram-bot-api')
const commands = require('./commands')
require('dotenv').config()

let bot = new telegramBot(process.env.BOT_TOKEN, { polling: true })

commands.publishImage(bot)
