import request from '../../utils/request'
module.exports = {
    getPresents: data => request.get('/clubs/presence/list', data),
}