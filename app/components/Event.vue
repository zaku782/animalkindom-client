<template>
    <div class="event-table">
        <ul class="nav nav-pills event-type">
            <li role="presentation"><a href="#friend">{{ 'friend' | msg }}</a></li>
            <li role="presentation"><a href="#attack">{{ 'attack' | msg }}</a></li>
            <li role="presentation"><a href="#gift">{{ 'gift' | msg }}</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane" id="friend">
                <table v-if="friendEvent.length > 0"
                       class="table table-content-center table-striped table-th-horizontal">
                    <tbody>
                    <tr v-for="friend in friendEvent">
                        <td>{{friend.requesterName}}</td>
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

            $('.event-type a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            }).on('shown.bs.tab', (e) => {
                if (e.target.hash === '#friend') {
                    Event.friendEvent().then((res) => {
                        if (res.type === 'success') {
                            this.friendEvent = res.data;
                        }
                    })
                } else if (e.target.hash === '#attack') {

                } else {

                }
            });

            $("a[href='#" + this.$route.params.type + "']").trigger('click');
        },
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>
    .event-table {
        margin-top: 25px;
        margin-left: 15px;
    }
</style>