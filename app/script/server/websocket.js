import Env from './env.js'
import Message from "../message";
import App from '../app.js';


export default {
    socketConnect: null,
    connect() {
        let animalId = localStorage.getItem("animalId");
        if (animalId) {
            this.socketConnect = new WebSocket((Env.baseURL + "/websocket/" + animalId).replace("http", "ws"));
            this.socketConnect.onopen = function () {

            };
            this.socketConnect.onmessage = function (msg) {
                if (msg.data) {
                    msgPop(msg.data);
                }
            };
            this.socketConnect.onclose = function () {

            };
            this.socketConnect.onerror = function () {

            }
        }
    },
    isConnected() {
        return this.socketConnect && this.socketConnect.readyState === 1;
    }
}

function msgPop(msg) {
    let message = msg.split("_");
    switch (message[0]) {
        case 'friend-make':
            ifAtEventPage('friend');
            Message.toPop(Message.filterByTemplate('make_friend_request', message[1], message[2]) + ' <a href="#/event/friend/" class="message-tip" data-spop="close">' + Message.filters('check') + '</a>', 'info', -1);
            break;
        case 'friend-reject':
            ifAtEventPage('friend');
            Message.toPop(Message.filterByTemplate('friend_reject', message[1], message[2]) + ' <a href="#/event/friend/" class="message-tip" data-spop="close">' + Message.filters('check') + '</a>', 'danger', -1);
            break;
        default:
            Message.toPop(Message.filters(msg.data) + ' <a href="#/event/friend/" class="message-tip" data-spop="close">' + Message.filters('check') + '</a>', 'warning', -1);
    }
}

function ifAtEventPage(eventType) {
    if (location.hash.indexOf('/event/') !== -1) {
        App.hub.$emit('eventOnMsg', {
            'eventType': eventType
        });
    }
}
