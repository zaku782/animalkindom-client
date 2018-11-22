<template id="index">
    <div class="row">
        <div class="col-md-4 col-xs-12 col-sm-6 info">
            <info></info>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button" @click="explore">
            <div class="btn btn-info big-btn">
                {{'explore'|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button" @click="sleep">
            <div class="btn btn-primary sleep big-btn">
                {{sleepStatus|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button">
            <div class="btn btn-success big-btn" @click="items">
                {{'items'|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button">
            <div class="btn btn-warning big-btn" @click="land">
                {{'land'|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button" @click="event">
            <div class="btn btn-purple big-btn">
                {{'event'|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button" @click="signOut">
            <div class="btn btn-danger big-btn">
                {{'sign_out'|msg}}
            </div>
        </div>
    </div>
</template>

<script>
    require('../style/css/anim.scss')
    import Message from '../script/message.js'
    import Account from '../script/server/account.js'
    import App from '../script/app.js'
    import Info from './Info.vue'
    import Animal from '../script/server/animal'

    export default {
        created: function () {

        },
        data: function () {
            return {
                sleepStatus: 'sleep',
                animalId: 0
            }
        },
        mounted: function () {
            App.hub.$on('infoLoaded', (info) => {
                this.sleepStatus = info.sleeping ? 'sleeping' : 'sleep';
            });
        },
        methods: {
            sleep: function () {
                Animal.sleep().then((res) => {
                    if (this.sleepStatus === 'sleeping') {
                        Message.infoWithNoFilter(Message.filters('awake') + '<br>' + Message.filters('vigour_recover') + ' : ' + res.data.vigourRecover + '<br>' + Message.filters('satiety_cost') + ' : ' + res.data.satietyCost)
                        App.hub.$emit('sleepEnd', res.data);
                    }
                    this.sleepStatus = this.sleepStatus === 'sleep' ? 'sleeping' : 'sleep';
                })
            },
            items: function () {
                this.act(() => {
                    App.router.$router.push('items');
                })
            },
            land: function () {
                this.act(() => {
                    App.router.$router.push('land');
                })
            },
            signOut: function () {
                Account.signOut().then(() => {
                    App.router.$router.push('sign');
                })
            },
            explore: function () {
                this.act(() => {
                    App.router.$router.push('explore');
                })
            },
            act: function (action) {
                if (this.sleepStatus !== 'sleeping') {
                    action();
                } else {
                    Message.error('need_awake')
                }
            },
            event: function () {
                this.act(() => {
                    App.router.$router.push('event/friend');
                })
            }
        },
        components: {Info},
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>
    .row {
        margin-top: 15px;
    }

    .info {
        height: 100%;
    }
</style>
