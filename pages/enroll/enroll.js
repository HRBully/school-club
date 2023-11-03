// pages/enroll/enroll.js
import api from './api'
import idDeadlineTime from '../../utils/isDeadlineTime'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPull: false,
        isLoading:true,
        isTop:true,
        isAll:false,
        page: 1,
        count: 10,
        classes: "",
        topDistance: 0,
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
        infoLists: [],
        classInfoList: [],
        classList: [{
                class: "全部",
                value: 0
            },
            {
                class: "思想政治",
                value: 1
            },
            {
                class: "学术科技",
                value: 2
            },
            {
                class: "文化体育",
                value: 3
            },
            {
                class: "志愿公益",
                value: 4
            },
            {
                class:"创新创业",
                value: 5
            },
            {
                class:"自律互助",
                value: 6
            }
        ]
    },

    /**
     * 列表获取函数
     */
    loadPresences(page, count, classes) {
        api.getPresents({
            page,
            count,
            classes
        }).then(res => {
            let {
                presenceLists,
                page
            } = res
            this.setData({
                infoLists: presenceLists,
                page,
                isPull: false,
                isLoading: false
            })
        })
    },
    loadClassLists(page, count, classes) {
        api.getPresents({
            page,
            count,
            classes
        }).then(res => {
            let {
                presenceLists,
                page
            } = res
            this.setData({
                classInfoList: presenceLists,
                page,
                isPull: false,
                isLoading: false
            })
        })
    },
    onTabsChange(e) {
        console.log(Boolean(e.detail.value))
        if (e.detail.value === 0) {
            this.setData({
                classes: "",
                isAll:Boolean(e.detail.value)
            })
        } else {
            this.setData({
                classes: e.detail.value,
                isAll:Boolean(e.detail.value)
            })
            let page = 1;
            let count = 100;
            let classes = this.data.classes;
            this.loadClassLists(page, count, classes)
        }
    },
    onLoad(options) {
        let page = this.data.page;
        let count = this.data.count;
        let classes = this.data.classes;
        this.loadPresences(page, count, classes)
    },
    // 下拉刷新
    onPull() {
        this.setData({
            page: 1,
        })
        let page = this.data.page;
        let count = this.data.count;
        let classes = this.data.classes;
        this.loadPresences(page, count, classes)
    },
    // 触底加载
    onDown() {
        if (this.data.isAll === true) {
            return
        }
        
        this.setData({
            page:this.data.page+1
        })
        let page = this.data.page;
        let count = this.data.count;
        let classes = this.data.classes;
        api.getPresents({
            page,
            count,
            classes
        }).then(res => {
            let {
                presenceLists,
                page
            } = res
            this.setData({
                infoLists: [...this.data.infoLists, ...presenceLists],
                page:page,
                isPull: false,
                isLoading: false
            })
        })
    },
    onMonitor(e) {
        if(e.detail.scrollTop > 150) {
            this.setData({
                isTop:false
            })
        }else {
            this.setData({
                isTop:true
            })
        }
    },
    // 回到顶部
    trunTop() {
        this.setData({
            topDistance: 0
        })
    },
    // 详情跳转
    goDetails(e) {
        wx.navigateTo({
          url: '../../pages/details/details?id=' + e.target.dataset.id + '&classes=' + e.target.dataset.classes
        })
      },

    gotoApply(){
        if (wx.getStorageSync('isBind')) {
            if (idDeadlineTime()) {
                wx.showToast({
                    title: "不在报名时间内，无法修改",
                    icon: 'none',
                    duration: 3000
                })
            } else {
                wx.navigateTo({
                    url: '../personal/applyCommunity/applyCommunity',
                })
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
    onShareAppMessage() {},
    onShareTimeline() {},
})