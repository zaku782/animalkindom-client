import Net from './net.js'

export default {
    signIn: function(data) {
        return Net.post('/signIn/', data);
    },
    isLogin: function() {
        return Net.get('/isLogin/');
    },
    signOut: function() {
        return Net.post('/signOut/');
    },
    signUp: function(data) {
        return Net.post('/signUp/', data);
    }
}
