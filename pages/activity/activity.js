// pages/activity/activity.js
import api from './api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        overlayVisible: false,
        status: 0,
        showTimeId: 0,
        timeName: '时间',
        typeName: '类别',
        showTypeId: 0,
        timeVisible: false,
        typeVisible: false,
        isLoading:true,
        isPull: false,
        isTop:true,
        topDistance: 0,
        classes: '',
        page: 1,
        count: 10,
        Time: 'Year',
        getAllow: true,
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
        timeList: [{
                name: '不限',
                value: 'Year'
            },
            {
                name: '一周内',
                value: 'Week'
            },
            {
                name: '半月内',
                value: 'HalfMonth'
            },
            {
                name: '一月内',
                value: 'Month'
            },
            {
                name: '半年内',
                value: 'HalfYear'
            },
            {
                name: '一年内',
                value: 'Year'
            }
        ],
        typeList: [
            '不限',
            '思想政治',
            '学术科技',
            '文化体育',
            '志愿公益',
            '创新创业',
            '自律互助'
        ],
        infolists: []
    },
    // 打开时间选择面板
    openTimeSelect() {
        if (this.data.typeVisible) {
            this.setData({
                typeVisible: false,
            })
        }
        let timeVisible = !this.data.timeVisible
        let overlayVisible = timeVisible
        this.setData({
            timeVisible,
            overlayVisible,
        })

    },
    // 打开类型选择面板
    openTypeSelect() {
        if (this.data.timeVisible) {
            this.setData({
                timeVisible: false,
            })
        }
        let typeVisible = !this.data.typeVisible
        let overlayVisible = typeVisible
        this.setData({
            typeVisible,
            overlayVisible,
        })

    },
    // 取消遮罩层
    handleOverlayClick(e) {
        this.setData({
            overlayVisible: e.detail.visible,
            timeVisible: false,
            typeVisible: false,
            getAllow: true
        })
    },
    // 取消
    toCancel() {
        this.setData({
            overlayVisible: false,
            timeVisible: false,
            typeVisible: false
        })
    },
    trunTop() {
        this.setData({
            topDistance: 0
        })
    },
    // 获取时间
    chooseTime(e) {
        let id = e.currentTarget.dataset.id
        let Time = this.data.timeList[id].value
        this.setData({
            Time,
            showTimeId: id
        })
    },
    // 获取类别
    chooseType(e) {
        let id = e.currentTarget.dataset.id
        let classes = id
        this.setData({
            classes,
            showTypeId: id
        })
    },
    // 提交时间
    toTimeConfirm() {
        let timeName = this.data.timeList[this.data.showTimeId].name
        this.setData({
            timeName,
            overlayVisible: false,
            status: 1,
            timeVisible: false,
            typeVisible: false,
            page: 1,
            infolists: []
        })
        this.doubleUnlimited()
        this.getActiveList()
    },
    // 提交类别
    toTypeConfirm() {
        let typeName = this.data.typeList[this.data.showTypeId]
        this.setData({
            typeName,
            overlayVisible: false,
            status: 1,
            timeVisible: false,
            typeVisible: false,
            page: 1,
            infolists: []
        })
        this.doubleUnlimited()
        this.getActiveList()
    },
    // 判断双不限
    doubleUnlimited() {
        if(!this.data.showTimeId && !this.data.showTypeId) {
            this.setData({
                status: 0
            })
        }
    },
    // 获取活动列表
    async getActiveList() {
        if (this.data.getAllow) {
            this.setData({
                getAllow: false
            })
            try {
                let status = this.data.status
                let page = this.data.page
                let count = this.data.count
                let Time = this.data.Time
                let classes = this.data.classes
                let newLists = []
                switch (status) {
                    // 获取列表
                    case 0: {
                        const {
                            activeLists
                        } = await api.getActives({
                            page,
                            count
                        })
                        newLists = activeLists
                        break;
                    }

                    // 综合筛选
                    case 1: {
                        if (!this.data.showTypeId) {
                            const
                                activeLists = await api.getLimitList({
                                    page,
                                    count,
                                    Time
                                })
                            newLists = activeLists
                            break;
                        } else {
                            const
                                activeLists = await api.getLimitList({
                                    page,
                                    count,
                                    Time,
                                    classes
                                })
                            newLists = activeLists
                            break;
                        }

                    }
                }
                let infolists = [...this.data.infolists, ...newLists]
                page++
                this.setData({
                    page,
                    infolists,
                    getAllow: true,
                    isLoading: false
                })
            } catch (err) {
                console.log('err is -> ' + err)
                this.setData({
                    getAllow: true
                })
            }
        }

    },

    // 上拉刷新
    onPull() {
        if (!this.data.isPull) {
            this.resetMes()
            this.getActiveList()
            this.setData({
                isPull: false
            })
        }
    },
    onDown() {
        this.getActiveList()
    },
    // 刷新重置信息状态
    resetMes() {
        this.setData({
            overlayVisible: false,
            status: 0,
            showTimeId: 0,
            timeName: '时间',
            typeName: '类别',
            showTypeId: 0,
            timeVisible: false,
            typeVisible: false,
            isPull: false,
            classes: '',
            page: 1,
            count: 10,
            Time: 'Year',
            getAllow: true,
            infolists: []
        })
    },
    // 前往活动详情
    goDetails(e) {
        wx.navigateTo({
            url: '../../pages/details/details?id=' + e.target.dataset.id + '&classes=' + e.target.dataset.classes
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.getActiveList()
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