import Vue from 'vue'
import App from '../app.js'
import Message from '../message.js'
import Env from './env.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

let socketConnect;

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

function connect() {
    console.log('connect to server');
    let animalId = localStorage.getItem("animalId");
    if (animalId) {
        socketConnect = new WebSocket((Env.baseURL + "/websocket/" + animalId).replace("http", "ws"));
        socketConnect.onopen = function () {

        };
        socketConnect.onmessage = function (msg) {
            if (msg.data) {
                let message = msg.data.split("_");
                if (message[0] === 'friend') {
                    Message.toPop(Message.filters(message[1]) + '[' + message[2] + ']' + Message.filters('make_friend_tip') + ' <a href="#/event/friend/" class="message-tip" data-spop="close">' + Message.filters('check') + '</a>', 'info', -1)
                } else {
                    Message.toPop(Message.filters(msg.data) + ' <a href="#/event/friend/" class="message-tip" data-spop="close">' + Message.filters('check') + '</a>', 'warning', -1)
                }
            }
        };
        socketConnect.onclose = function () {

        };
        socketConnect.onerror = function () {

        }
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

    if (!socketConnect || socketConnect.readyState !== 1) {
        connect()
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
        console.log(e)
        Message.error('server_error');
    })
};
