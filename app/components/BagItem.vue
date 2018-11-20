<template>
    <div>
        <div class='load-tip'>
            <progress-bar color="progress-bar progress-bar-info"
                          :value="bagLoad" :base="maxLoad"></progress-bar>
        </div>

        <transition>
            <table v-if="items.length > 0"
                   class="table table-content-center table-striped table-th-horizontal">
                <tbody>
                <tr v-for="item in items">
                    <td>{{item.name|msg}}</td>
                    <td>{{'satiety'|msg}}<strong>+{{item.satietyAdd}}</strong>
                        {{'vigour'|msg}}<strong>+{{item.vigourAdd}}</strong>
                        {{'load'|msg}}<strong>+{{item.weight}}</strong>
                    </td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm" @click="eatFromBag(item)">
                            {{'eat'|msg}}
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-else class="nothing">{{'bag_empty'|msg}}</div>
        </transition>
    </div>
</template>

<script>

    import Message from '../script/message.js'
    import Animal from '../script/server/animal'
    import ProgressBar from './ProgressBar.vue'

    export default {
        name: "Inventory",
        mounted: function () {
            Animal.getBagLoad().then((res) => {
                if (res.type === 'success') {
                    this.maxLoad = res.data;
                }
            }).then(Animal.getBagItems().then((res) => {
                if (res.type === 'success') {
                    this.items = res.data;
                    for (let item of this.items) {
                        this.bagLoad += item.weight;
                    }
                }
            }));
        },
        data: function () {
            return {
                bagLoad: 0,
                maxLoad: 0,
                items: []
            }
        },
        methods: {
            eatFromBag: function (item) {
                Animal.eatFromBag(item.id).then((res) => {
                    if (res.type === 'success') {
                        Message.infoWithNoFilter(
                            Message.filters('vigour_recover') + ' : ' + res.data.vigourAdd + '<br>' +
                            Message.filters('satiety_recover') + ' : ' + res.data.satietyAdd);
                        this.bagLoad -= item.weight;
                        this.items = this.items.filter(i => i !== item);
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

    table {
        margin-top: 15px;
    }

    .nothing {
        text-align: center;
        padding-top: 30%;
        font-weight: bold;
        font-size: 2em;
    }

    .load-tip {
        margin-top: 15px;
        font-weight: bold;
        font-size: 3em;
    }

    @media screen and (max-width: 400px) {
        .load-tip {
            font-size: 2em;
        }
    }
</style>