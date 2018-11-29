<template>
    <div class="event-list">
        <ul class="nav nav-pills event-type">
            <li role="presentation"><a href="#friend">{{ 'friend' | msg }}</a></li>
            <li role="presentation"><a href="#attack">{{ 'attack' | msg }}</a></li>
            <li role="presentation"><a href="#gift">{{ 'gift' | msg }}</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane" id="friend">
                <table v-if="friendEvent.length > 0"
                       class="table table-content-center table-striped table-th-horizontal data">
                    <tbody>
                    <tr v-for="event in friendEvent">
                        <td>
                            <if v-if="event.type==='friend_request'">
                                {{'make_friend_request'|msgTemp(event.senderSpecies,event.senderName)}}
                                <if v-if="!event.done">
                                    <button type="button" class="btn btn-success btn-sm" @click="accept">
                                        {{'accept'|msg}}
                                    </button>
                                    <button type="button" class="btn btn-danger btn-sm" @click="reject">
                                        {{'reject'|msg}}
                                    </button>
                                </if>
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

    export default {
        name: "Event.vue",
        data: function () {
            return {
                friendEvent: []
            }
        },
        mounted: function () {
            let component = this;
            $('.event-type a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            }).on('shown.bs.tab', (e) => {
                if (e.target.hash === '#friend') {
                    Event.friendEvent().then((res) => {
                        if (res.type === 'success') {
                            component.friendEvent = res.data;
                        }
                    })
                } else if (e.target.hash === '#attack') {

                } else {

                }
            });

            $("a[href='#" + this.$route.params.type + "']").trigger('click');
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