import Net from './net.js'

export default {
    friendEvent: function () {
        return Net.get('/event/friendEvent/');
    }
}