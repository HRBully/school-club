import api from './api'
const app = getApp();

Page({
    data: {
        aid: '',
        sno: '',
        name: '',
        college: '',
        collegeIndex: 0,
        major: '',
        majorIndex: 0,
        majorShow: [],      // 当前学院的专业列表
        majorCollegeList: [],    // 学院专业列表
        phone: ''
    },
    onLoad: function (options) {
        const name = wx.getStorageSync('name')
        const sno = wx.getStorageSync('sno')
        this.setData({
            aid: options.aid,
            sno,
            name,
            majorCollegeList: app.globalData.majorCollegeList
        })
    },
    // 信息提示
    showMsg(msg) {
        wx.showToast({
            title: msg,
            icon: 'none',
            duration: 3000
        })
    },
    // 学院选项
    changeCollege(e) {
        const arr = this.data.majorCollegeList
        this.setData({
            collegeIndex: e.detail.value,
            college: arr[e.detail.value].college,
            majorShow: arr[e.detail.value].majors,
            majorIndex: 0,
            major: ''
        })
    },
    // 专业选项
    changeMajor(e) {
        const arr = this.data.majorShow
        this.setData({
            majorIndex: e.detail.value,
            major: arr[e.detail.value]
        })
    },
    // 手机号正则
    checkPhone() {
        const phoneReg = new RegExp(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)
        if (phoneReg.test(this.data.phone)) {
            return true
        } else {
            this.showMsg("请检查您的手机号")
            return false
        }
    },
    // 学院是否为空
    checkCollege() {
        if (this.data.college) {
            return true
        } else {
            this.showMsg("请选择学院信息")
            return false
        }
    },
    // 专业是否为空
    checkMajor() {
        if (this.data.major) {
            return true
        } else {
            this.showMsg("请选择专业信息")
            return false
        }
    },
    // 表单验证
    checkForm() {
        return this.checkCollege()
            && this.checkMajor()
            && this.checkPhone()
    },
    apply() {
        if (this.checkForm()) {
            const { aid, sno, name, college, major, phone } = this.data
            const form = { aid, sno, name, college, major, phone }
            form.sno = Number.parseInt(form.sno)
            form.phone = Number.parseInt(form.phone)
            wx.showModal({
                title: '提示',
                content: '确认提交吗，提交后不可更改',
                success(res) {
                    if (res.confirm) {
                        api.applyActive(form).then(() => {
                            wx.showToast({
                                title: '提交成功',
                                icon: 'success',
                                duration: 1500
                            })
                        })
                    }
                }
            })
        }
    },
})