const moment = require('moment')
const CONFIG = require('./config')
const fileUtils = require('./utils/file')
const imageUtils = require('./utils/image')

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

  let fileData = fileUtils.getFileData()
  let isImageExist = fileData.images.includes(IMAGE_NAME)

  if (!isImageExist) {
    let stream = fileUtils.getFileStream(IMAGE_NAME)

    bot.sendPhoto(CONFIG.CHAT_ID, stream)

    if (msg) {
      bot.sendMessage(msg.from.id, `I've added image #${IMAGE_NAME}`)
    }

    fileData.images.push(IMAGE_NAME)
    fileUtils.writeFile(fileData)

  } else if (msg) {
    bot.sendMessage(msg.from.id, `Image #${IMAGE} already exist`)
  }
}

const deleteImage = (bot, msg, match = []) => {
  const IMAGE_ID = match[1]

  if (IMAGE_ID) {
    const IMAGE_NAME = imageUtils.getImageName(IMAGE_ID)

    let fileData = fileUtils.getFileData()
    let isImageExist = fileData.images.includes(IMAGE_NAME)

    if (isImageExist) {
      bot.sendMessage(msg.from.id, `I've deleted image #${IMAGE}`)

      fileData.images = fileData.images.filter(image => image !== IMAGE)
      fileUtils.writeFile(fileData)

    } else {
      bot.sendMessage(msg.from.id, `Image #${IMAGE} doesn't exist`)
    }
  }
}

module.exports = {
  showImage,
  publishImage,
  deleteImage
}
