// 报名时间计算
const app = getApp()
const dlTime = app.globalData.deadlineTime
export default () => {
    let timestamp = Date.parse(new Date());
    let deadlineTime = Date.parse(new Date(dlTime));
    return timestamp > deadlineTime
}