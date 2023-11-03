import request from '../../../utils/request'
module.exports = {
    applyClub: data => request.post('/clubs/apply', data),
}
