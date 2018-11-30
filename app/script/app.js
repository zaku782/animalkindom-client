import Vue from 'vue'
import VueRouter from 'vue-router'
import SignComponent from '../components/Sign.vue';
import IndexComponent from '../components/Index.vue'
import LandComponent from '../components/Land.vue'
import ExploreComponent from '../components/Explore.vue'
import BagItemComponent from '../components/BagItem.vue'
import AddPropComponent from '../components/AddProp.vue'
import EventComponent from '../components/Event.vue'

//使用路由插件
Vue.use(VueRouter);

export default {
    router: null,
    hub: null,
    init: function () {
        if (!this.router) {
            const routes = [
                {path: '/sign', component: SignComponent},
                {path: '/', component: SignComponent},
                {path: '/index', component: IndexComponent},
                {path: '/land', component: LandComponent},
                {path: '/explore', component: ExploreComponent},
                {path: '/items', component: BagItemComponent},
                {path: '/prop', component: AddPropComponent},
                {path: '/event/:type', component: EventComponent}
            ];

            const router = new VueRouter({
                routes
            });

            this.router = new Vue({
                router
            });

            this.hub = new Vue();
        }
    }
}
