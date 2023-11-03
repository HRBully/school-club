// pages/details/details.js
import api from './api'
import idDeadlineTime from '../../utils/isDeadlineTime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 共公部分
    isActive: true,
    cover: "http://dummyimage.com/300x200",
    name: "计算机协会",
    classes: "学术科技",
    group:"http://dummyimage.com/400x400",
    intro:"信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息",
    // 风采部分
    imgs: [
      "http://dummyimage.com/300x200",
      "http://dummyimage.com/300x200",
      "http://dummyimage.com/300x200",
      "http://dummyimage.com/300x200",
      "http://dummyimage.com/300x200"
    ],
    slogan:"代码改变世界",
    // 活动部分
    start_time:"2022-20-21",
    end_time:"2023-21-31",
    time:"2032",
    club: "计算机协会",
    site:"综合楼c312",
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    let isActive = Boolean(Number(options.classes))
    this.setData({
      isActive,
      id: options.id
    })
    // 活动详情获取
    if (isActive) {
      api.getActInfo({
          aid:options.id
      }).then(res => {
        console.log(res)
       let {name,intro,time,start_time,end_time,site,club,cover,group} = res
       this.setData({
           name,
           intro,
           time,
           start_time,
           end_time,
           site,
           club,
           cover,
           group
       })
      })
    } else {
        // 风采详情获取
      api.getPreInfo({
          cid:options.id
      }).then(res => {
        let {name, intro,slogan,group,cover,imgs,classes} = res
        this.setData({
            name,
            intro,
            slogan,
            group,
            cover,
            imgs,
            classes
        })
      })
    }
  },
  gotoApply(){
    if (wx.getStorageSync('isBind')) {
      if(this.data.isActive) {
        let url = '../personal/applyActivity/applyActivity?aid=' + this.data.id
        wx.navigateTo({ url })
      } else {
        if (idDeadlineTime()) {
          wx.showToast({
            title: "不在报名时间内，无法修改",
            icon: 'none',
            duration: 3000
          })
        } else {
          let url = '../personal/applyCommunity/applyCommunity'
          wx.navigateTo({ url })
        }
      }
    } else {
      wx.showToast({
        title: "请先绑定账号",
        icon: 'none',
        duration: 3000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */

  // 分享好友和朋友圈
  onShareAppMessage(){
    const title = this.data.name
    return { title }
  },
  onShareTimeline(){
    const title = this.data.name
    return { title }
  },
})