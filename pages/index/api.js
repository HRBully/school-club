import request from '../../utils/request'
module.exports = {
    getPresents: data => request.get('/clubs/presence/list', data),
    getActives: data => request.get('/clubs/active/list',data),
}
