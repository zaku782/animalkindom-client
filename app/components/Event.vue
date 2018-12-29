<template>
    <div class="event-list">
        <ul class="nav nav-pills event-type">
            <li role="presentation"><a href="#friend">{{ 'friend' | msg }}</a></li>
            <li role="presentation"><a href="#attack">{{ 'attack' | msg }}</a></li>
            <li role="presentation"><a href="#gift">{{ 'gift' | msg }}</a></li>
        </ul>
        <div class="tab-content">
            <!--好友申请-->
            <div class="tab-pane" id="friend">
                <table v-if="friendEvents.length > 0"
                       class="table table-bordered table-content-center table-striped table-th-horizontal data">
                    <tbody>
                    <tr v-for="event in friendEvents">
                        <td>
                            <if v-if="event.sender === animalId">
                                {{'make_friend_request'|msgTemp(event.senderSpecies,event.senderName)}}
                            </if>
                            <if v-else>
                                {{'make_friend_receive'|msgTemp(event.senderSpecies,event.senderName)}}
                            </if>
                        </td>
                        <td>
                            <if v-if="!event.done">
                                <if v-if="event.sender === animalId">
                                    {{'request_sent'|msg}}
                                </if>
                                <if v-else>
                                    <button type="button" class="btn btn-success btn-sm" @click="accept">
                                        {{'accept'|msg}}
                                    </button>
                                    <button type="button" class="btn btn-danger btn-sm" @click="reject(event)">
                                        {{'reject'|msg}}
                                    </button>
                                </if>
                            </if>
                            <if v-else>
                                {{event.type|msg}}
                            </if>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="tab-pane" id="attack">2</div>
            <div class="tab-pane" id="gift">3</div>
        </div>
    </div>
</template>

<script>

    import Message from '../script/message.js'
    import Event from '../script/server/event.js'
    import Animal from '../script/server/animal.js'
    import App from '../script/app.js'

    export default {
        name: "Event.vue",
        data: function () {
            return {
                friendEvents: [],
                animalId: localStorage.getItem("animalId") - 0
            }
        },
        mounted: function () {
            let component = this;
            $('.event-type a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            }).on('shown.bs.tab', (e) => {
                if (e.target.hash === '#friend') {
                    component.getFriendEvents();
                } else if (e.target.hash === '#attack') {

                } else {

                }
            });

            App.hub.$on('eventOnMsg', (eventInfo) => {
                console.log('run');
                if (eventInfo.eventType === 'friend') {
                    this.getFriendEvents();
                }
            });

            $("a[href='#" + this.$route.params.type + "']").trigger('click');
        },
        methods: {
            getFriendEvents: function () {
                Event.friendEvent().then((res) => {
                    if (res.type === 'success') {
                        this.friendEvents = res.data;
                    }
                })
            },
            accept: function () {

            },
            reject: function (event) {
                Animal.friendReject(event.sender).then((res) => {
                    if (res.type === 'success') {
                        event.done = true;
                        event.type = 'reject';
                    }
                })
            }
        },
        filters: {
            msg: Message.filters,
            msgTemp: Message.filterByTemplate
        }
    }
</script>

<style scoped>
    .event-list {
        margin-top: 25px;
        margin-left: 15px;
    }

    .data {
        margin-top: 10px;
    }

    .btn {
        margin-left: 5px;
    }
</style>