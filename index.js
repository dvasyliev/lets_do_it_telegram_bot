const telegramBot = require('node-telegram-bot-api')
const jobs = require('./jobs')
const CONFIG = require('./config')

let bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true })

bot.onText(/\/test/, (msg, match) => {
  bot.sendMessage(msg.from.id, `Hi, ${msg.from.first_name}! I'm okay!`)
})

bot.onText(/\/list/, (msg, match) => {
  jobs.getImagesList(bot, msg, match)
})

bot.onText(/\/show (\d+)/, (msg, match) => {
  jobs.showImage(bot, msg, match)
})

bot.onText(/\/publish (\d+)/, (msg, match) => {
  jobs.publishImage(bot, msg, match)
})

bot.onText(/\/delete (\d+)/, (msg, match) => {
  jobs.deleteImage(bot, msg, match)
})
