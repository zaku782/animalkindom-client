import Vue from 'vue'
import app from '../app.js'
import Toastr from '../../plugin/toastr/toastr.min.js'
import Message from '../message.js'
import Env from './env.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

//使用axios网络请求插件
//设置请求带cookie
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios)

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

    if (type == 'get') {
        axiosRequest = Vue.axios.get(fullURL);
    } else {
        axiosRequest = Vue.axios.post(fullURL, data);
    }

    return axiosRequest.then((response) => {
        if (response.data && response.data.content === 'login_status_error') {
            if (location.hash === '#/index') {
                Toastr.error(Message.filters('login_status_error'));
            }
            app.router.$router.push('sign')
        }
        return response.data;
    }).catch(function () {
        Toastr.error(Message.filters('server_error'));
    })
}
