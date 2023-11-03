import request from '../../utils/request'
module.exports = {
    getPreInfo: data => request.get('/club/present/info', data),
    getActInfo: data => request.get('/clubs/active/intro',data),
}