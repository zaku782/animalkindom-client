<template>
    <div>
        <div class='btn-list'>
            <button type="button" class="btn btn-success" @click="explore">{{exploreStatus|msg}}</button>
            <div class="alert alert-warning explore-tip" role="alert">{{'tip'|msg}} : {{'explore_tip'|msg}}</div>
        </div>


        <table v-if="plants.length > 0"
               class="table table-content-center table-striped table-th-horizontal">
            <tr>
                <th>
                    {{"res_name"|msg}}
                </th>
                <th>
                    {{"res_function"|msg}}
                </th>
                <th>
                    {{"item_weight"|msg}}
                </th>
                <th>
                    {{"res_operation"|msg}}
                </th>
            </tr>
            <tbody>
            <tr v-for="plant in plants">
                <td>{{plant.name|msg}}</td>
                <td>{{'satiety'|msg}}<strong>+{{plant.satietyAdd}}</strong>
                    {{'vigour'|msg}}<strong>+{{plant.vigourAdd}}</strong>
                </td>
                <td>{{plant.weight}}</td>
                <td>
                    <button type="button" class="btn btn-info btn-sm" @click="eatAtOnce(plant)">
                        {{'eat'|msg}}
                    </button>
                    <button type="button" class="btn btn-success btn-sm" @click="collectPlant(plant)">
                        {{'collect'|msg}}
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

        <table v-if="animals.length > 0"
               class="table table-content-center table-striped table-th-horizontal">
            <tr>
                <th>
                    {{"name"|msg}}
                </th>
                <th>
                    {{"species"|msg}}
                </th>
                <th>
                    {{"health"|msg}}
                </th>
                <th>
                    {{"action"|msg}}
                </th>
            </tr>
            <tbody>
            <tr v-for="animal in animals">
                <td>{{animal.accountName}}</td>
                <td>{{animal.name|msg}}</td>
                <td>{{animal.health}}</td>
                <td>
                    <button type="button" class="btn btn-warning btn-sm" @click="">
                        {{'friend'|msg}}
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" @click="">
                        {{'attack'|msg}}
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

        <div v-if="plants.length===0 && animals.length===0" class="nothing">{{'find_nothing'|msg}}</div>
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
                    Animal.getFindPlants().then((res) => {
                        if (res.data) {
                            this.plants = res.data;
                        }
                    })
                }
            })
        },
        data: function () {
            return {
                exploreStatus: 'start_explore',
                plants: [],
                animals: []
            }
        },
        methods: {
            explore: function () {
                this.plants.length = 0;
                this.animals.length = 0;
                Animal.explore().then((res) => {
                        if (this.exploreStatus === 'exploring') {
                            this.plants = res.data.plants;
                            this.animals = res.data.animals;
                        }
                        this.exploreStatus = this.exploreStatus === 'start_explore' ? 'exploring' : 'start_explore';
                    }
                )
            },
            collectPlant: function (plant) {
                Animal.collectPlant(plant.name).then((res) => {
                    if (res.type === 'success') {
                        Message.info('save_to_bag')
                        this.plants = this.plants.filter(p => p !== plant);
                    } else {
                        Message.error(res.content);
                    }
                })
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

    @media screen and (max-width: 400px) {
        .explore-tip {
            display: block;
            margin-top: 15px;
        }
    }
</style>