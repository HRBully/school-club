import request from '../../../utils/request'
module.exports = {
    applyActive: data => request.post('/clubs/active/apply', data),
}