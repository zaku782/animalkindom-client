<template>
    <div class="land row">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div class="draw-frame">
                <div id="drawing"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 action-button">
            <button type="button" class="btn btn-success enter-land-button big-btn"
                    :disabled="prohibit" @click="enterLand">{{'enter'|msg}}
            </button>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 land-info">
            <table class="table table-bordered table-hover table-content-center table-striped">
                <tbody>
                <tr>
                    <th>{{'landName'|msg}}</th>
                    <td>{{chooseLand.name}}</td>
                </tr>
                <tr>
                    <th>456</th>
                    <td>456</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 action-button">
            <button type="button" class="btn btn-info big-btn" @click="back">{{'back'|msg}}
            </button>
        </div>
    </div>
</template>

<script>

    import Message from '../script/message.js'
    import SvgLand from '../script/svgland.js'
    import Land from '../script/server/land.js'
    import App from '../script/app.js'

    export default {
        name: "Land",
        data: function () {
            return {
                prohibit: true,
                chooseLand: {id: 0, name: ''},
                lands: undefined
            }
        },
        mounted: function () {
            let component = this;
            component.getLandAndDraw();
            window.onresize = function temp() {
                component.getLandAndDraw()
            }
        },
        methods: {
            setLandFrameSize: function () {
                let drawFrame = $(".draw-frame");
                if ($(window).width() > Math.min($(window).height())) {
                    drawFrame.height($(window).height() - 35);
                } else {
                    drawFrame.height(Math.min($(window).height() - 35, drawFrame.width()));
                }
            },
            getLandAndDraw: function () {
                let component = this;
                this.setLandFrameSize();

                if (component.lands) {
                    component.drawLand(component.lands, true)
                } else {
                    Land.lands().then((res) => {
                        if (res.type !== 'danger') {
                            component.chooseLand = res.data[0];
                            component.lands = {
                                current: res.data[0],
                                discoveredLands: res.data.slice(1)
                            };
                            component.drawLand(component.lands, false)
                        }
                    });
                }
            },
            drawLand: function (landData, resize) {
                let component = this;
                SvgLand.drawLand($(".draw-frame"), 'drawing', landData, function (land) {
                    component.prohibit = !SvgLand.reachable(land.id);
                    component.chooseLand = land;
                }, resize);
            },
            enterLand: function () {
                let component = this;
                Land.enter(component.chooseLand.id).then((res) => {
                    if (res.type === 'success') {
                        component.lands.current = component.chooseLand;
                        component.prohibit = !SvgLand.reachable(component.lands.current.id);
                        this.drawLand(component.lands, true);
                        Message.infoWithNoFilter(Message.filters('move_to') + component.chooseLand.name + '<br>' + Message.filters('vigour_cost') + ' : ' + res.data.vigourCost + '<br>' + Message.filters('satiety_cost') + ' : ' + res.data.satietyCost);
                    }
                    if (res.type === 'warning') {
                        Message.warning(res.content);
                    }
                })
            },
            back: function () {
                App.router.$router.push('index')
            }
        },
        components: {},
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>
    .table-bordered th, td {
        border: 1px solid #d0d5d6 !important;
    }

    .row {
        margin-top: 15px;
    }

    .draw-frame {
        overflow: hidden;
        position: relative;
        border: 1px solid #d0d5d6 !important;
        margin-bottom: 15px;
    }

    #drawing {
        position: absolute;
    }

    .land {
        user-select: none;
    }

    .action-button {
        height: 125px;
        margin-bottom: 15px;
    }

    .land-info {
        margin-bottom: 15px;
    }
</style>