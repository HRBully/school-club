import request from '../../utils/request'
module.exports = {
    getActiveIntro: data => request.get('/clubs/active/intro', data),
    getActives: data => request.get('/clubs/active/list',data),
    getLimitList: data => request.get('/clubs/active/limitlist',data),
}