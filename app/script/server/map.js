import Net from './net.js'

export default {
    maps: function(data) {
        return Net.post('/maps/', data);
    }
}
