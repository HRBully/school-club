import request from '../../../utils/request'
module.exports = {
    getActivities: () => request.get('/user/active'),
}
