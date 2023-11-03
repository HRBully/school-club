/**
 * upload.js 
 * 封装 Promise 格式通用请求
 * 返回线上地址
 */

const app = getApp();
// const baseURL = app.globalData.baseUrl;
const url = 'https://st.wh2mcy.top/api/v2/UploadImage'

export default () => {
    return new Promise((resolve, reject) => {
        wx.chooseMedia({
            count: 1,
            success: res => {
                wx.showLoading({
                    title: '图片上传中...',
                    mask: true
                });
                wx.uploadFile({
                    // url: baseURL + url,
                    url: url,
                    header: {
                        "token": app.globalData.token
                    },
                    filePath: res.tempFiles[0].tempFilePath,
                    name: 'file',
                    success: res => {
                        wx.hideLoading();
                        try {
                            var data = JSON.parse(res.data)
                        } catch (error) {
                            wx.showToast({
                                title: '图片上传失败',
                                icon: 'error',
                                duration: 1500
                              })
                        }
                        if (data.code == 200) {
                            wx.showToast({
                                title: '图片上传成功',
                                icon: 'success',
                                duration: 1500
                              })
                            resolve(data.data)
                        } else {
                            reject(data.msg)
                        }
                    },
                    fail: err => {
                        wx.hideLoading();
                        wx.showToast({
                            title: '图片上传失败',
                            icon: 'error',
                            duration: 1500
                          })
                        reject(err)
                    }
                })
            }
        })
    })
}
