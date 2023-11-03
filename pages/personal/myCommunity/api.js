import request from '../../../utils/request'
module.exports = {
    getClubs: () => request.get('/user/club'),
}
