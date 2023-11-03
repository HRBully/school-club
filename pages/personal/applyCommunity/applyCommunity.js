import api from './api'
import upload from '../../../utils/upload'

// url为服务器地址
const app = getApp();
const durl = /https:\/\/([^\/]+)\//i;
const url = app.globalData.baseUrl.match(durl)[0];

Page({
  data: {
    name: '',
    sno: '',
    sex: '1',     // 0女 1男
    sexList: ["女", "男"],
    college: '',
    collegeIndex: 0,
    major: '',
    majorIndex: 0,
    majorShow: [],      // 当前学院的专业列表
    majorCollegeList: [],    // 学院专业列表
    political: '',
    politicalIndex: 0,
    politicalList: [],      // 政治面貌列表
    QQ: '',
    phone: '',
    club_1: '',
    club_2: '',
    index_1: 0,
    index_2: 0,
    clubList: [],    // 社团名列表
    picture: '',
  },
  onLoad() {
    const name = wx.getStorageSync('name')
    const sno = wx.getStorageSync('sno')
    const { sex, college, collegeIndex, major, majorIndex, political, politicalIndex, QQ, phone, club_1, club_2, index_1, index_2, picture } = wx.getStorageSync('clubFormData')
    this.setData({ sex: sex ? sex : '1' })
    this.setData({ name, sno, college, collegeIndex, major, majorIndex, political, politicalIndex, QQ, phone, club_1, club_2, index_1, index_2, picture })
    // 数据列表填充
    this.setData({ majorCollegeList: app.globalData.majorCollegeList })
    this.setData({ majorShow: app.globalData.majorCollegeList[collegeIndex ? collegeIndex : 0].majors })
    this.setData({ politicalList: app.globalData.politicalList })
    this.setData({ clubList: app.globalData.clubList })
  },
  // 信息提示
  showMsg(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 3000
    })
  },
  // 添加证件照
  addImg() {
    var that = this
    upload().then(res => {
      that.setData({
        picture: url + res
      })
    })
  },
  // 性别选项
  changeSex(e) {
    this.setData({ sex: e.detail.value })
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
  // 政治面貌选项
  changePolitical(e) {
    const arr = this.data.politicalList
    this.setData({
      politicalIndex: e.detail.value,
      political: arr[e.detail.value]
    })
  },
  // 社团1选项
  changeClubOne(e) {
    const arr = this.data.clubList
    this.setData({
      index_1: e.detail.value,
      club_1: arr[e.detail.value]
    })
  },
  // 社团2选项
  changeClubTwo(e) {
    const arr = this.data.clubList
    this.setData({
      index_2: e.detail.value,
      club_2: arr[e.detail.value]
    })
  },
  // QQ正则
  checkQQ() {
    const qqReg = new RegExp(/^\d{5,11}$/)
    console.log(qqReg.test(this.data.QQ));
    if (qqReg.test(this.data.QQ)) {
      return true
    } else {
      this.showMsg("请检查您的QQ")
      return false
    }
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
  // 证件照是否存在
  checkPicture() {
    if (this.data.picture) {
      return true
    } else {
      this.showMsg("请添加证件照")
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
  // 政治面貌是否为空
  checkPolitical() {
    if (this.data.political) {
      return true
    } else {
      this.showMsg("请选择政治面貌信息")
      return false
    }
  },
  // 社团1是否存在，社团2是否重复
  checkClub() {
    const club_1 = this.data.club_1
    const club_2 = this.data.club_2
    if (club_1 && (club_1 !== club_2)) {
      return true
    } else if (club_1 == "" || club_1 == undefined) {
      this.showMsg("社团一不能为空")
      return false
    } else if (club_1 === club_2) {
      this.showMsg("社团不能重复")
      return false
    }
  },
  // 表单验证
  checkForm() {
    return this.checkQQ()
      && this.checkPhone()
      && this.checkPicture()
      && this.checkCollege()
      && this.checkMajor()
      && this.checkPolitical()
      && this.checkClub()
  },
  // 提交
  submitForm() {
    if (this.checkForm()) {
      const { name, sno, sex, college, collegeIndex, major, majorIndex, political, politicalIndex, QQ, phone, club_1, club_2, index_1, index_2, picture } = this.data
      const index = { collegeIndex, majorIndex, politicalIndex, index_1, index_2 }
      const form = { name, sno, sex, QQ, phone, college, major, political, club_1, club_2, picture }
      form.sno = Number.parseInt(form.sno)
      form.QQ = Number.parseInt(form.QQ)
      form.phone = Number.parseInt(form.phone)
      wx.showModal({
        title: '提示',
        content: '确认提交吗，提交后不可更改',
        success(res) {
          if (res.confirm) {
            // 表单存储
            wx.setStorage({
              key: 'clubFormData',
              data: { ...form, ...index }
            })
            // 提交表单
            api.applyClub(form).then(() => {
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
  }
})