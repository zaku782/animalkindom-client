<template id="index">
    <div class="row">
        <div class="col-md-4 col-xs-12 col-sm-6 info">
            <info></info>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button ">
            <div class="btn btn-info">
                {{'explore'|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button" @click="sleep">
            <div class="btn btn-primary sleep">
                {{sleepStatus|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button">
            <div class="btn btn-success">
                {{'inventory'|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button">
            <div class="btn btn-warning" @click="openMap">
                {{'map'|msg}}
            </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-6 action-button" @click="signOut">
            <div class="btn btn-danger">
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
                sleepStatus: 'sleep'
            }
        },
        mounted: function () {
            Account.isLogin().then((res) => {
                if (res.type === 'success') {

                } else {
                    App.router.$router.push('sign');
                }
            });

            App.hub.$on('sleep', (sleep) => {
                this.sleepStatus = sleep ? 'sleeping' : 'sleep';
            })
        },
        methods: {
            explore: function () {

            },
            sleep: function () {
                Animal.sleep().then(() => {
                    this.sleepStatus = this.sleepStatus == 'sleep' ? 'sleeping' : 'sleep';
                })
            },
            inventory: function () {

            },
            openMap: function () {
                App.router.$router.push('map');
            },
            signOut: function () {
                Account.signOut().then(() => {
                    App.router.$router.push('sign');
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

    .action-button {
        height: 125px;
        margin-bottom: 15px;
    }

    .btn {
        height: 100%;
        width: 100%;
        line-height: 2.2;
        font-size: 45px;
        font-weight: bold;
        border-radius: 0px;
    }

    .info {
        height: 100%;
    }
</style>
