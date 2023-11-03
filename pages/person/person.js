// pages/person/person.js
import api from './api'
const app = getApp();
Page({
    data: {
        sno:  wx.getStorageSync("sno"),
        name:  wx.getStorageSync("name"),
        btnList: [
            {
                name: '我的社团',
                target: '../personal/myCommunity/myCommunity'
            }, {
                name: '我的活动',
                target: '../personal/myActivity/myActivity'
            }
        ],
        isBind: wx.getStorageSync("isBind")
    },
    gotoPage(e) {
        const url = e.currentTarget.dataset.target
        console.log(url);
        wx.navigateTo({ url })
    },
    reset() {
        this.setData({
            sno: '',
            name: ''
        })
    },
    confirm() {
        // 正则匹配
        const sno = this.data.sno
        const snoReg = new RegExp(/^\d{10}$/)
        const name = this.data.name
        const nameReg = new RegExp(/^[\u4E00-\u9FA5]{2,4}$/)
        const checkForm = (snoReg.test(sno))&&(nameReg.test(name))
        // 信息提交
        let that = this
        if(checkForm){
            wx.showModal({
                title: '提示',
                content: '提交后不可更改，是否提交',
                success: function (res) {
                    if (res.confirm) {
                        that.bindInfo()
                    }
                }
            })
        } else {
            wx.showToast({
                title: "请再次确认您的信息",
                icon: 'none',
                duration: 3000
            })
        }
    },
    bindInfo() {
        const info = {
            name: this.data.name,
            sno: Number.parseInt(this.data.sno),
            code: ''
        }
        wx.login({
            success: res => {
                info.code = res.code
                api.bindInfo(info).then(res => {
                    app.globalData.token = res
                    wx.setStorageSync('isBind', true)
                    this.setData({ isBind: true })
                })
            }
        })
    }
})