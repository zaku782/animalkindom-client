<template>
    <div class="info">
        <img :src="img" class="profile"/>
        <table class="table table-content-center table-striped">
            <tbody>
            <tr>
                <th>{{'name'|msg}}</th>
                <td>{{info.accountName}}</td>
            </tr>
            <tr>
                <th>{{'species'|msg}}</th>
                <td>{{info.name|msg}}<strong v-if="info.growLevel>0">+{{info.growLevel}}</strong></td>
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
                <th>{{'vigour'|msg}}<i class="fa fa-question-circle-o" tabindex="0"
                                       data-toggle="popover" data-trigger="focus"
                                       data-placement="top"
                                       :title="'vigour'|msg"
                                       :data-content="'prop_vigour'|msg"></i>
                </th>
                <td>
                    <progress-bar color="progress-bar progress-bar-info"
                                  :value="info.vigour" :base="100"></progress-bar>
                </td>
            </tr>
            <tr>
                <th>{{'strength'|msg}}<i class="fa fa-question-circle-o" tabindex="0"
                                         data-toggle="popover" data-trigger="focus"
                                         data-placement="top"
                                         :title="'strength'|msg"
                                         :data-content="'prop_strength'|msg"></i>
                </th>
                <td>{{info.strength}}</td>
            </tr>
            <tr>
                <th>{{'intelligence'|msg}}<i class="fa fa-question-circle-o" tabindex="0"
                                             data-toggle="popover" data-trigger="focus"
                                             data-placement="top"
                                             :title="'intelligence'|msg"
                                             :data-content="'prop_intelligence'|msg"></i>
                </th>
                <td>{{info.intelligence}}</td>
            </tr>
            <tr>
                <th>{{'agile'|msg}}<i class="fa fa-question-circle-o" tabindex="0"
                                      data-toggle="popover" data-trigger="focus"
                                      data-placement="top"
                                      :title="'agile'|msg"
                                      :data-content="'prop_agile'|msg"></i>
                </th>
                <td>{{info.agile}}</td>
            </tr>
            <tr>
                <th>{{'speed'|msg}}<i class="fa fa-question-circle-o" tabindex="0"
                                      data-toggle="popover" data-trigger="focus"
                                      data-placement="top"
                                      :title="'speed'|msg"
                                      :data-content="'prop_speed'|msg"></i>
                </th>
                <td>{{info.speed}}</td>
            </tr>
            <tr>
                <th>{{'souls'|msg}}<i class="fa fa-question-circle-o" tabindex="0"
                                      data-toggle="popover" data-trigger="focus"
                                      data-placement="top"
                                      :title="'souls'|msg"
                                      :data-content="'prop_souls'|msg"></i>
                </th>
                <td>{{info.souls}}</td>
            </tr>
            <tr>
                <th>{{'metempsychosisCount'|msg}}<i class="fa fa-question-circle-o" tabindex="0"
                                                    data-toggle="popover" data-trigger="focus"
                                                    data-placement="top"
                                                    :title="'metempsychosisCount'|msg"
                                                    :data-content="'prop_metempsychosisCount'|msg"></i>
                </th>
                <td>
                    <div class="timer" v-if="!growComplete">
                        <span class="days"></span>{{'day'|msg}}
                        <span class="hours"></span>{{'hour'|msg}}
                        <span class="minutes"></span>{{'minute'|msg}}
                        <span class="seconds"></span>{{'second'|msg}}
                    </div>
                    <div v-else>
                        <button type="button"
                                class="btn btn-danger btn-sm"
                                data-toggle="modal"
                                :data-target="'#metempsychosis_confirm'">
                            {{'metempsychosis'|msg}}
                        </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <div v-if="growComplete" class="alert alert-warning metempsychosis-tip" role="alert">{{'tip'|msg}} :
            {{'metempsychosis_wait'|msg}}
        </div>

        <div class="modal" id="metempsychosis_confirm" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="confirm-title">
                            <strong>{{'metempsychosis'|msg}}</strong>
                        </div>
                    </div>

                    <div class="confirm-prompt">
                        {{'metempsychosis_prompt'|msg}}
                    </div>

                    <div class="souls-cost">
                        <label>{{'souls_for_metempsychosis'|msg}}: {{useSouls}}</label>
                        <input type="range" min="0" step="100" :max="info.souls" v-model.number="useSouls">
                    </div>

                    <div class="confirm-tip">
                        <strong>{{'tip'|msg}}:{{'metempsychosis_tip'|msg}}</strong>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
                            {{ 'confirm_no' | msg }}
                        </button>
                        <button type="button"
                                class="btn btn-success btn-sm"
                                @click="metempsychosis">
                            {{ 'confirm_yes' |msg }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    require('../plugin/countdown/js/jquery.countdown.js');
    import Animal from '../script/server/animal.js'
    import Message from '../script/message.js'
    import ProgressBar from './ProgressBar.vue'
    import App from '../script/app.js'

    export default {
        name: "Animal",
        data: function () {
            return {
                img: require("../assets/images/loading.gif"),
                info: {},
                growComplete: false,
                useSouls: 0
            }
        },
        mounted: function () {

            this.getInfo();

            App.hub.$on('sleepEnd', (sleepData) => {
                this.info.vigour = this.info.vigour + sleepData.vigourRecover;
                this.info.satiety = this.info.satiety - sleepData.satietyCost;
            });

            $(".fa-question-circle-o").popover({})
        },
        methods: {
            getInfo: function () {
                Animal.getInfo().then((res) => {
                    if (res.type === 'success') {
                        this.info = res.data;

                        if (this.info.point) {
                            Message.toPop(Message.filters('point_to_alloc') + ' <a href="#/prop/" data-spop="close">' + Message.filters('alloc') + '</a>', 'warning', -1);
                        }

                        this.img = require("../assets/images/animal/" + this.info.name + "/" + this.info.growLevel + ".jpg");
                        App.hub.$emit('infoLoaded', {
                            'sleeping': this.info.sleepTime != null
                        });

                        let endTime = parseInt(this.info.metempsychosisTime) + parseInt(this.info.growDay * 24 * 3600 * 1000);
                        $('.timer').countdown(endTime, (event) => {
                            let $this = $(this.$el);
                            switch (event.type) {
                                case "seconds":
                                case "minutes":
                                case "hours":
                                case "days":
                                case "weeks":
                                case "daysLeft":
                                    $this.find('span.' + event.type).html(event.value);
                                    break;
                                case "finished":
                                    this.growComplete = true;
                                    break;
                            }
                        });
                    }
                });
            },
            metempsychosis: function () {
                Animal.metempsychosis(this.useSouls).then((res) => {
                    if (res.type === 'success') {
                        Message.info('metempsychosis_complete')
                        this.getInfo();
                    }
                })
            }
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
        padding-bottom: 5px;
        padding-right: 1px;
    }

    .info {
        height: 100%;
        margin-bottom: 15px !important;
    }

    .metempsychosis-tip {
        margin-top: 10px;
        margin-bottom: 0;
    }

    .souls-cost {
        width: 60%;
        margin-left: 20%;
    }
</style>