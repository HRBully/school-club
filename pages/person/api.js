import request from '../../utils/request'
module.exports = {
    bindInfo: data => request.post('/regist', data),
}
