const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
// 设置Storage
const setStorage = (key,data) => {
    wx.setStorageSync(key, data)
}
// 获取Storage
const getStorage = (key) => {
    return wx.getStorageSync(key)
}
module.exports = {
  formatTime,
  getStorage,
  setStorage
}
