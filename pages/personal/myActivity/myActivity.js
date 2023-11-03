// pages/myActivity.js
import api from './api'
Page({
    data: {
        activities:[]
    },
    onLoad: function (options) {
        api.getActivities().then(res => {
            this.setData({
                activities: res.activies
            })
        })
    },
    goDetails: function(e){
        const aid = e.currentTarget.dataset.aid
        wx.navigateTo({
            url: '../../../pages/details/details?id=' + aid + '&classes=1'
        })
    },
})