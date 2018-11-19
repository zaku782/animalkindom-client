<template>
    <div class="prop-panel">
        <div class="points">
            <strong>{{'point_left'|msg}}:{{point}}</strong>
        </div>
        <table class="table table-content-center table-striped">
            <tbody>
            <tr>
                <th>{{'strength'|msg}}</th>
                <td><i class="fa fa-minus-circle fa-2x" aria-hidden="true" @click="minus('strength', $event)"></i>
                    <span class="prop">{{strength}}</span>
                    <i class="fa fa-plus-circle fa-2x" aria-hidden="true" @click="add('strength', $event)"></i>
                </td>
            </tr>
            <tr>
                <th>{{'intelligence'|msg}}</th>
                <td><i class="fa fa-minus-circle fa-2x" aria-hidden="true" @click="minus('intelligence', $event)"></i>
                    <span class="prop">{{intelligence}}</span>
                    <i class="fa fa-plus-circle fa-2x" aria-hidden="true" @click="add('intelligence', $event)"></i>
                </td>
            </tr>
            <tr>
                <th>{{'agile'|msg}}</th>
                <td><i class="fa fa-minus-circle fa-2x" aria-hidden="true" @click="minus('agile', $event)"></i>
                    <span class="prop">{{agile}}</span>
                    <i class="fa fa-plus-circle fa-2x" aria-hidden="true" @click="add('agile', $event)"></i>
                </td>
            </tr>
            <tr>
                <th>{{'speed'|msg}}</th>
                <td><i class="fa fa-minus-circle fa-2x" aria-hidden="true" @click="minus('speed', $event)"></i>
                    <span class="prop">{{speed}}</span>
                    <i class="fa fa-plus-circle fa-2x" aria-hidden="true" @click="add('speed', $event)"></i></td>
            </tr>
            </tbody>
        </table>

        <div class="submit">
            <div class="btn btn-success" @click="submit">
                {{'alloc'|msg}}
            </div>
            <div class="btn btn-warning" @click="reset">
                {{'reset'|msg}}
            </div>
        </div>
    </div>
</template>

<script>

    import Animal from '../script/server/animal.js'
    import Message from '../script/message.js'
    import App from '../script/app.js'

    export default {
        name: "AddProp",
        data: function () {
            return {
                info: {},
                point: 0,
                strength: 0,
                intelligence: 0,
                agile: 0,
                speed: 0
            }
        },
        watch: {
            point: function (newPoint, oldPoint) {
                if (newPoint === 0) {
                    $(this.$el).find(".fa-plus-circle").css('color', '#cac5c5');
                } else {
                    $(this.$el).find(".fa-plus-circle").css('color', '#5cb85c');
                }
            }
        },
        mounted: function () {
            Animal.getInfo().then((res) => {
                if (res.type === 'success') {
                    this.info = res.data;
                    this.reset();
                }
            })
        },
        methods: {
            add: function (prop, event) {
                if (this.point > 0) {
                    this[prop] = this[prop] + 1;
                    this.point = this.point - 1;
                }
                $(event.currentTarget).prev().prev().css('color', '#d9534f');
            },
            minus: function (prop) {
                if (this[prop] > this.info[prop]) {
                    this[prop] = this[prop] - 1;
                    this.point = this.point + 1;
                }
                if (this[prop] === this.info[prop]) {
                    $(event.currentTarget).css('color', '#cac5c5');
                }
            },
            submit: function () {
                if (this.point === this.info.point) {
                    Message.error('no_alloc')
                } else {
                    Animal.addPoint({
                        strengthAdd: this.strength - this.info.strength,
                        intelligenceAdd: this.intelligence - this.info.intelligence,
                        agileAdd: this.agile - this.info.agile,
                        speedAdd: this.speed - this.info.speed
                    }).then((res) => {
                        if (res.type === 'success') {
                            Message.info('alloc_complete');
                            App.router.$router.back();
                        }
                    })
                }
            },
            reset: function () {
                this.point = this.info.point;
                this.strength = this.info.strength;
                this.intelligence = this.info.intelligence;
                this.agile = this.info.agile;
                this.speed = this.info.speed;
                $(this.$el).find(".fa-minus-circle").css('color', '#cac5c5');
            }
        },
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>
    .prop-panel {
        justify-content: center;
        display: flex;
        height: inherit;
        align-items: center;
        flex-direction: column;
    }

    th {
        width: 40%;
        font-size: 1.5em;
        padding: 5px 0 5px 0;
    }

    td {
        font-size: 1em;
        padding: 5px 0 5px 0 !important;
        font-weight: bold;
    }

    .points {
        font-size: 2em;
        margin-bottom: 15px;
    }

    .prop {
        vertical-align: super;
    }

    .fa {
        margin-right: 5px;
    }

    .fa-plus-circle {
        color: #5cb85c;
    }

    .fa-minus-circle {
        color: #cac5c5
    }

    .submit {
        margin-top: 20px;
    }
</style>