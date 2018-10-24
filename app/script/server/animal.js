import Net from './net.js'

export default {
    getInfo: function() {
        return Net.get('/animal/getInfo/');
    },
    explore:function () {
        
    },
    sleep:function () {
        return Net.get('/animal/sleep/');
    }
}
