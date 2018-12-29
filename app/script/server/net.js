import Vue from 'vue'
import App from '../app.js'
import Message from '../message.js'
import Env from './env.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Websocket from './websocket.js'

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

export default {
    get(api) {
        return request(api, 'get');
    },
    post(api, data) {
        return request(api, 'post', data);
    }
}


let request = function (api, type, data) {

    let axiosRequest;
    let fullURL = Env.baseURL + api;

    if (type === 'get') {
        axiosRequest = Vue.axios.get(fullURL);
    } else {
        axiosRequest = Vue.axios.post(fullURL, data);
    }

    if (!Websocket.isConnected() && !window.location.href.endsWith('/#/') && window.location.href.indexOf('sign') < 0) {
        Websocket.connect();
    }

    return axiosRequest.then((response) => {
        if (response.data && response.data.content === 'login_status_error') {
            if (location.hash === '#/index') {
                Message.error('login_status_error');
            }
            App.router.$router.push('sign')
        }
        return response.data;
    }).catch(function (e) {
        Message.error('server_error');
    })
};
