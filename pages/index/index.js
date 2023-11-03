// index.js
// 获取应用实例
const app = getApp()
import api from './api'
Page({
  data: {
    // 骨架屏配置
    isLoading:true,
    rowCol2: [{
        width: '566rpx',
        height: '32rpx'
      },
      {
        width: '100%',
        height: '32rpx'
      },
      {
        width: '100%',
        height: '32rpx'
      },
      {
        width: '314rpx',
        height: '32rpx'
      },
    ],
    animation: 'flashed',
    // 页数配置
    acpage: 1,
    prePage: 1,
    count: 10,
    current: 1,
    // 轮播图配置
    autoplay: true,
    isPull: false,
    duration: 500,
    interval: 5000,
    navigation: {
      type: 'dots'
    },
    
    swipers: [{
        cls: 'item0',
        image: "https://st.wh2mcy.top/api/UploadImage/jRlzlA.png",
      },
      {
        cls: 'item1',
        image: "https://st.wh2mcy.top/api/UploadImage/23SV7Z.png",
      }
    ],
    // 信息列表配置
    isEnroll: false,
    activeLists: [{
        name: "编程挑战赛",
        image: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner1.png?imageMogr2/thumbnail/1053x564/quality/70/strip/format/webp",
        class: "信息",
        club: "信息信息信息",
        slogan: "用代码改变人生",
        intro: "信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息"
      },
      {
        name: "电子技术与应用协会",
        image: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner1.png?imageMogr2/thumbnail/1053x564/quality/70/strip/format/webp",
        class: "学术科技",
        club: "电子技术与应用协会",
        slogan: "用代码改变人生",
        intro: "计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会"
      }
    ],
    presenceLists: [{
        name: "信息",
        image: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner1.png?imageMogr2/thumbnail/1053x564/quality/70/strip/format/webp",
        class: "信息",
        club: "信息信息信息",
        slogan: "用代码改变人生",
        intro: "信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息"
      },
      {
        name: "电子技术与应用协会",
        image: "https://cdn-we-retail.ym.tencent.com/tsr/home/v2/banner1.png?imageMogr2/thumbnail/1053x564/quality/70/strip/format/webp",
        class: "学术科技",
        club: "电子技术与应用协会",
        slogan: "用代码改变人生",
        intro: "计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会计算机协会"
      }
    ]
  },
  loadActives(page, count) {
    api.getPresents({
      page,
      count
    }).then(res => {
      let {
        presenceLists,
        page
      } = res
      this.setData({
        presenceLists,
        prePage: page,
        isPull: false,
        isLoading:false
      })
    })
  },
  loadPresences(page, count) {
    api.getActives({
      page,
      count
    }).then(res => {
      let {
        activeLists,
        page
      } = res
      this.setData({
        activeLists,
        acPage: page,
        isPull: false,
        isLoading:false
      })
    })
  },
  onLoad() {
    let count = this.data.count
    this.loadActives(1, count)
    this.loadPresences(1, count)
  },
  // tab滑块更改事件
  onTabsChange(e) {
    // 转为类型控制显隐
    this.setData({
      isEnroll: Boolean(parseInt(e.detail.value))
    })
  },
  // 下拉刷新数据
  onPull() {
    let count = this.data.count
    this.loadPresences(1, count)
    this.loadActives(1, count)
  },
  onDown() {
    let count = this.data.count
    if (this.data.isEnroll) {
      this.setData({
          acPage:this.data.acPage+1
      })
      api.getActives({
        page: this.data.acPage,
        count
      }).then(res => {
        let {
          activeLists,
          page
        } = res
        let lists = this.data.activeLists
        this.setData({
          activeLists: [...lists, ...activeLists],
          acPage: page
        })
      })
    } else {
        this.setData({
            prePage:this.data.prePage+1
        })
      api.getPresents({
        page: this.data.prePage,
        count
      }).then(res => {
        let {
          presenceLists,
          page
        } = res
        let lists = this.data.presenceLists
        this.setData({
          presenceLists: [...lists, ...presenceLists],
          prePage: page
        })
        // console.log(this.data.presenceLists)
      })
    }
  },
  goDetails(e) {
    console.log(e)
    wx.navigateTo({
      url: '../../pages/details/details?id=' + e.target.dataset.id + '&classes=' + e.target.dataset.classes
    })
  },
  // 分享好友和朋友圈
  onShareAppMessage() {},
  onShareTimeline() {},
})