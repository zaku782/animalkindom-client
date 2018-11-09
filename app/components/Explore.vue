<template>
    <div>
        <div class='btn-list'>
            <button type="button" class="btn btn-success" @click="explore">{{exploreStatus|msg}}</button>
            <div class="alert alert-warning explore-tip" role="alert">{{'tip'|msg}} : {{'explore_tip'|msg}}</div>
        </div>

        <transition>
            <table v-if="plants.length > 0"
                   class="table table-bordered table-hover table-content-center table-striped table-th-horizontal">
                <tr>
                    <th>
                        {{"find_name"|msg}}
                    </th>
                    <th>
                        {{"find_function"|msg}}
                    </th>
                    <th>
                        {{"find_operation"|msg}}
                    </th>
                </tr>
                <tbody>
                <tr v-for="plant in plants">
                    <td>{{plant.name|msg}}</td>
                    <td>{{'recover'|msg}}<strong>{{plant.satietyAdd}}</strong>{{'satiety'|msg}}<strong>{{plant.vigourAdd}}</strong>{{'vigour'|msg}}
                    </td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" @click="eatAtOnce(plant)">
                            {{'eat'|msg}}
                        </button>
                        <button type="button" class="btn btn-success btn-sm" @click="collect">{{'collect'|msg}}</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-else class="nothing">{{'find_nothing'|msg}}</div>
        </transition>
    </div>
</template>

<script>

    import Message from '../script/message.js'
    import Animal from '../script/server/animal'

    export default {
        name: "Explore",
        created: function () {
            Animal.isExploring().then((res) => {
                this.exploreStatus = res.data ? 'exploring' : 'start_explore';
                if (this.exploreStatus === 'start_explore') {
                    Animal.getFinds().then((res) => {
                        if (res.data) {
                            this.plants = res.data.plant;
                        }
                    })
                }
            })
        },
        data: function () {
            return {
                exploreStatus: 'start_explore',
                plants: []
            }
        },
        methods: {
            explore: function () {
                this.plants.length = 0;
                Animal.explore().then((res) => {
                        if (this.exploreStatus === 'exploring') {
                            this.plants = res.data.finds.plant;
                        }
                        this.exploreStatus = this.exploreStatus === 'start_explore' ? 'exploring' : 'start_explore';
                    }
                )
            },
            collect: function () {

            },
            eatAtOnce: function (plant) {
                Animal.eatAtOnce(plant.name).then((res) => {
                    if (res.type === 'success') {
                        Message.infoWithNoFilter(
                            Message.filters('vigour_recover') + ' : ' + res.data.vigourAdd + '<br>' +
                            Message.filters('satiety_recover') + ' : ' + res.data.satietyAdd)
                        this.plants = this.plants.filter(p => p !== plant);
                    }

                })
            }
        },
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>
    .btn-list {
        margin-top: 15px;
    }

    table {
        margin-top: 15px;
    }

    .nothing {
        text-align: center;
        padding-top: 30%;
        font-weight: bold;
        font-size: 2em;
    }

    .explore-tip {
        display: inline;
        padding: 12px;
        vertical-align: middle;
    }
</style>