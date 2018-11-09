import Net from './net.js'

export default {
    lands: function () {
        return Net.get('/land/lands/');
    },
    enter: function (mapId) {
        return Net.post('/land/enter/' + mapId + '/')
    }
}
