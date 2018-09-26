const fs = require('fs')
const FILE_NAME = `./posts/${new Date().getFullYear()}.json`

const _createFile = () => {
  if (!fs.existsSync(FILE_NAME)) {
    fs.mkdirSync('posts')
    fs.appendFileSync(FILE_NAME, JSON.stringify({ images: [] }))
  }
}

const getFileData = () => {
  _createFile()

  return JSON.parse(fs.readFileSync(FILE_NAME, 'utf8'))
}

const getFileStream = (image_name) => {
  return fs.createReadStream(`./assets/images/${image_name}.jpg`)
}

const writeFile = (data) => {
  fs.writeFileSync(FILE_NAME, JSON.stringify(data))
}

module.exports = {
  getFileData,
  getFileStream,
  writeFile
}
