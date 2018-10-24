import Vue from 'vue'
import VueRouter from 'vue-router'
import SignComponent from '../components/Sign.vue'
import IndexComponent from '../components/Index.vue'
import MapComponent from '../components/Map.vue'

//使用路由插件
Vue.use(VueRouter)

export default {
    router: null,
    hub: null,
    init: function () {
        if (!this.router) {
            const routes = [
                {path: '/sign', component: SignComponent},
                {path: '/', component: SignComponent},
                {path: '/index', component: IndexComponent},
                {path: '/map', component: MapComponent}
            ]

            const router = new VueRouter({
                routes
            })

            this.router = new Vue({
                router
            });

            this.hub = new Vue();
        }
    }
}
