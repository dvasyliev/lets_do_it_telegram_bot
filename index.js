const telegramBot = require('node-telegram-bot-api')
const commands = require('./commands')
const CONFIG = require('./config')

let bot = new telegramBot(CONFIG.BOT_TOKEN, { polling: true })

bot.onText(/\/test/, (msg, match) => {
  bot.sendMessage(msg.from.id, `Hi, ${msg.from.first_name}! I'm okay!`)
})

bot.onText(/\/list/, (msg, match) => {
  commands.getImagesList(bot, msg, match)
})

bot.onText(/\/show (\d+)/, (msg, match) => {
  commands.showImage(bot, msg, match)
})

bot.onText(/\/publish (\d+)/, (msg, match) => {
  commands.publishImage(bot, msg, match)
})

bot.onText(/\/delete (\d+)/, (msg, match) => {
  commands.deleteImage(bot, msg, match)
})
