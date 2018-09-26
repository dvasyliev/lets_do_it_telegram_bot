const getImageName = (image) => {
  const length = `${image}`.length
  const prefix = '0'.repeat(3 - length)

  return `${prefix}${image}`
}

module.exports = {
  getImageName
}
