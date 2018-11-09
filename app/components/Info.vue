<template>
    <div class="info">
        <img :src="img" class="profile"/>
        <table class="table table-bordered table-hover table-content-center table-striped">
            <tbody>
            <tr>
                <th>{{'name'|msg}}</th>
                <td>{{info.accountName}}</td>
            </tr>
            <tr>
                <th>{{'species'|msg}}</th>
                <td>{{info.name|msg}}</td>
            </tr>
            <tr>
                <th>{{'health'|msg}}</th>
                <td>
                    <progress-bar color="progress-bar progress-bar-danger"
                                  :value="info.health" :base="info.baseHealth"></progress-bar>
                </td>
            </tr>
            <tr>
                <th>{{'satiety'|msg}}</th>
                <td>
                    <progress-bar color="progress-bar progress-bar-warning"
                                  :value="info.satiety" :base="info.baseSatiety"></progress-bar>
                </td>
            </tr>
            <tr>
                <th>{{'vigour'|msg}}</th>
                <td>
                    <progress-bar color="progress-bar progress-bar-info"
                                  :value="info.vigour" :base="100"></progress-bar>
                </td>
            </tr>
            <tr>
                <th>{{'strength'|msg}}</th>
                <td>{{info.strength}}</td>
            </tr>
            <tr>
                <th>{{'intelligence'|msg}}</th>
                <td>{{info.intelligence}}</td>
            </tr>
            <tr>
                <th>{{'agile'|msg}}</th>
                <td>{{info.agile}}</td>
            </tr>
            <tr>
                <th>{{'speed'|msg}}</th>
                <td>{{info.speed}}</td>
            </tr>
            <tr>
                <th>{{'grow_level'|msg}}</th>
                <td>
                    <progress-bar color="progress-bar progress-bar-success"
                                  :value="info.growLevel" :base="info.maxGrowLevel"></progress-bar>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import Animal from '../script/server/animal.js'
    import Message from '../script/message.js'
    import ProgressBar from './ProgressBar.vue'
    import App from '../script/app.js'

    export default {
        name: "Animal",
        data: function () {
            return {
                img: require("../assets/images/loading.gif"),
                info: {}
            }
        },
        mounted: function () {
            Animal.getInfo().then((res) => {
                if (res.type !== 'danger') {
                    this.info = res.data;
                    this.img = require("../assets/images/animal/" + this.info.name + "/" + parseInt(this.info.growLevel / 5) + ".jpg");
                    App.hub.$emit('initSleep', this.info.sleepTime != null);
                }
            })

            App.hub.$on('sleepEnd', (sleepData) => {
                this.info.vigour = this.info.vigour + sleepData.vigourRecover;
                this.info.satiety = this.info.satiety - sleepData.satietyCost;
            })
        },
        components: {
            ProgressBar
        },
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>
    .profile {
        width: 100%;
        cursor: pointer;
        background-color: #ecf0f1;
        padding-bottom: 5px;
        padding-right: 1px;
    }

    .info {
        height: 100%;
        margin-bottom: 15px !important;
    }
</style>