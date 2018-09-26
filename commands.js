const moment = require('moment')
const fileUtils = require('./utils/file')
const imageUtils = require('./utils/image')
require('dotenv').config()

const getImagesList = (bot, msg, match) => {
  let fileData = fileUtils.getFileData()
  let images = fileData.images.join(', ')

  bot.sendMessage(msg.from.id, `Images: ${images}`)
}

const showImage = (bot, msg, match = []) => {
  const IMAGE_ID = match[1]

  if (IMAGE_ID) {
    const IMAGE_NAME = imageUtils.getImageName(IMAGE_ID)
    let stream = fileUtils.getFileStream(IMAGE_NAME)

    bot.sendPhoto(msg.from.id, stream)
  }
}

const publishImage = (bot, msg, match = []) => {
  const IMAGE_ID = match[1] || moment().dayOfYear()
  const IMAGE_NAME = imageUtils.getImageName(IMAGE_ID)
  console.log('It works!')

  let fileData = fileUtils.getFileData()
  let isImageExist = fileData.images.includes(IMAGE_NAME)

  if (!isImageExist) {
    let stream = fileUtils.getFileStream(IMAGE_NAME)

    bot.sendPhoto(process.env.CHAT_ID, stream)

    if (msg) {
      bot.sendMessage(msg.from.id, `I've added image #${IMAGE_NAME}`)
    }

    fileData.images.push(IMAGE_NAME)
    fileUtils.writeFile(fileData)

  } else if (msg) {
    bot.sendMessage(msg.from.id, `Image #${IMAGE_NAME} already exist`)
  }
}

const deleteImage = (bot, msg, match = []) => {
  const IMAGE_ID = match[1]

  if (IMAGE_ID) {
    const IMAGE_NAME = imageUtils.getImageName(IMAGE_ID)

    let fileData = fileUtils.getFileData()
    let isImageExist = fileData.images.includes(IMAGE_NAME)

    if (isImageExist) {
      bot.sendMessage(msg.from.id, `I've deleted image #${IMAGE_NAME}`)

      fileData.images = fileData.images.filter(img => img !== IMAGE_NAME)
      fileUtils.writeFile(fileData)

    } else {
      bot.sendMessage(msg.from.id, `Image #${IMAGE_NAME} doesn't exist`)
    }
  }
}

module.exports = {
  getImagesList,
  showImage,
  publishImage,
  deleteImage
}
