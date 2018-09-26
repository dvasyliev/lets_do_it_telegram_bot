const telegramBot = require('node-telegram-bot-api')
const jobs = require('./jobs')
const CONFIG = require('./config')

let bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true })

jobs.publishImage(bot)
