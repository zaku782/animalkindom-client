require('./style/css/app.scss');
require('./plugin/font-awesome/css/font-awesome.css');
require('./plugin/bootstrap/css/bootstrap.min.css');
require('./plugin/spop/spop.min.css');
require('./plugin/bootstrap/js/bootstrap.min.js');
import App from './script/app.js'

window.onload = function () {
    App.init();
    App.router.$mount('#app');
};


