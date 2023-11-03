/**
 * request.js 
 * 封装 Promise 格式通用请求
 * url 请求地址
 * option 请求体
 */

const app = getApp();
const baseURL = app.globalData.baseUrl;

const request = (url, option) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + url,
            method: option.method.toUpperCase(),
            data: option.method.toUpperCase() === "GET" ? option.data : JSON.stringify(option.data),
            header: {
                "Authorization": app.globalData.token
            },
            success: res => {
                if (res.data.code == 200) {
                    resolve(res.data.data)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 3000
                    })
                }
            },
            fail: err => reject(err)
        })
    })
}

module.exports = {
    get (url, data) {
        return request(url, {
            method: "GET",
            data
        })
    },
    post (url, data) {
        return request(url, {
            method: "POST",
            data
        })
    }
}

