import api from './api'
import idDeadlineTime from '../../../utils/isDeadlineTime'
Page({
    data: {
        clubs: []
    },
    onLoad: function (options) {
        api.getClubs().then(res => {
            this.setData({
                clubs: res.clubs
            })
        })
    },
    goApplyClub() {
        if (idDeadlineTime()) {
            wx.showToast({
                title: "不在报名时间内，无法修改",
                icon: 'none',
                duration: 3000
            })
        } else {
            wx.navigateTo({
                url: '../applyCommunity/applyCommunity',
            })
        }
    }
})