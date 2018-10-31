import Net from './net.js'

export default {
    maps: function () {
        return Net.get('/map/maps/');
    },
    enter: function (mapId) {
        return Net.post('/map/enter/' + mapId + '/')
    }
}
