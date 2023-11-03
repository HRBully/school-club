// app.js
App({
    onLaunch() {
        var that = this;
        // 登录
        if (this.globalData.token === null || this.globalData.token === undefined) {
            wx.login({
                success: res => {
                    console.log(res.code);
                    wx.request({
                        url: this.globalData.baseUrl + '/login',
                        method: "POST",
                        data: {
                            code: res.code
                        },
                        success: res => {
                            const {
                                code,
                                data
                            } = res.data
                            if (code == 200) {
                                if (data.status == 1) {
                                    this.globalData.token = data.token
                                    wx.setStorageSync('isBind', true)
                                    wx.setStorageSync('name', data.name)
                                    wx.setStorageSync('sno', data.sno)
                                } else {
                                    this.globalData.token = null
                                    wx.setStorageSync('isBind', false)
                                }
                            } else {
                                // wx.showModal({
                                //   confirmColor: 'confirmColor',
                                //   confirmText: '确认',
                                //   content: '网络连接出现问题，请重新进入小程序',
                                //   showCancel: false,
                                //   title: '提示',
                                //   success: (result) => {
                                //     if (result.confirm) {
                                //       that.onLaunch()
                                //     }
                                //   },
                                // })
                            }
                        }
                    })
                }
            })
        }
    },
    globalData: {
        baseUrl: 'https://st.wh2mcy.top/api/',
        token: null,
        deadlineTime: "3000-10-22 20:00:00",    // 社团报名截止时间
        politicalList: ["", "群众", "共青团员", "预备党员", "中共党员"],
        clubList: ["", "青年马克思主义社团", "模拟联合国协会", "大学生英语考试交流协会", "计算机协会", "电子技术与应用协会", "军事爱好者协会", "奇点推理社", "圣火英语协会", "数学建模协会", "演讲与口才协会", "阳光心理学会", "TRIZ创新方法研究会", "游园社团", "创业者协会", "电子商务创业协会", "空间改造社团", "D.5.G街舞社团", "博弈棋牌协会", "飞扬羽毛球协会", "风火轮滑社", "海天武术协会", "翰轩书画社", "篮球部落协会", "礼仪之帮俱乐部", "罗杰网球俱乐部", "律动能力拓展协会", "名爵台球社", "排球爱好者协会", "乒博乒乓球协会", "奇炫魔术社团", "琴韵文学社", "摄影协会", "晓之风·灵动漫社", "摇滚阵地", "瀛海音乐协会", "粤语协会", "紫枫剧社", "纵横漂移族协会", "众恒橄榄球协会", "光影沈理工作室", "刻音说唱协会", "手绘社团", "舞蹈与形体礼仪表演社", "绿色方舟环保协会", "青年志愿者服务队", "勤工俭学协会"],
        majorCollegeList: [{
                college: "",
                majors: [""],
            },
            {
                college: "环境与化学工程学院",
                majors: ["", "化学工程与工艺", "环境工程", "安全工程", "应用化学", "化学","化学工程与工艺（H）"],
            },
            {
                college: "外国语学院",
                majors: ["", "英语", "俄语"],
            },
            {
                college: "装备工程学院",
                majors: [
                    "",
                    "探测制导与控制技术",
                    "弹药工程与爆炸技术",
                    "特种能源技术与工程",
                    "武器发射工程",
                    "信息对抗技术",
                    "智能无人系统技术"
                ],
            },
            {
                college: "机械工程学院",
                majors: ["", "机械设计制造及其自动化", "机械电子工程", "机器人工程"],
            },
            {
                college: "汽车与交通学院",
                majors: [
                    "",
                    "车辆工程",
                    "交通运输",
                    "能源与动力工程",
                    "装甲车辆工程",
                    "智能车辆工程",
                ],
            },
            {
                college: "信息科学与工程学院",
                majors: [
                    "",
                    "计算机科学与技术",
                    "通信工程",
                    "电子信息工程",
                    "电子信息科学与技术",
                    "网络工程",
                    "物联网工程",
                    "智能科学与技术",
                ],
            },
            {
                college: "理学院",
                majors: [
                    "",
                    "光信息科学与技术方向",
                    "信息显示与光电技术方向",
                    "信息与计算科学",
                ],
            },
            {
                college: "国际工程学院",
                majors: [
                    "",
                    "机械设计制造及其自动化",
                    "计算机科学与技术",
                    "金属材料工程",
                    "测控技术与仪器",
                ],
            },
            {
                college: "艺术设计学院",
                majors: ["", "工业设计", "产品设计", "动画", "视觉传达设计", "环境设计"],
            },

            {
                college: "自动化与电气工程学院",
                majors: ["", "自动化", "测控技术与仪器", "电气工程及其自动化", "电子科学与技术"],
            },

            {
                college: "经济管理学院",
                majors: [
                    "",
                    "工商管理",
                    "会计学",
                    "信息管理与信息系统",
                    "国际经济与贸易",
                    "金融学",
                    "经济学",
                    "物流管理",
                    "电子商务",
                ],
            },

            {
                college: "材料科学与工程学院",
                majors: [
                    "",
                    "材料成型及控制工程",
                    "金属材料工程",
                    "高分子材料与工程",
                    "无机非金属材料工程",
                    "粉体材料科学与工程",
                ],
            },
        ]
    }
})