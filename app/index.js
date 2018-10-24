
require('./style/css/app.scss')

import App from './script/app.js'

window.onload = function () {
    App.init();
    App.router.$mount('#app')
}


