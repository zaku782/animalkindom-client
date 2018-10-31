<template>
    <div class="map row">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div class="draw-frame">
                <div id="drawing"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 action-button">
            <button type="button" class="btn btn-success enter-map-button big-btn"
                    :disabled="prohibit" @click="enterMap">{{'enter'|msg}}
            </button>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 map-info">
            <table class="table table-bordered table-hover table-content-center table-striped">
                <tbody>
                <tr>
                    <th>{{'mapName'|msg}}</th>
                    <td>{{chooseMap.name}}</td>
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
    import SvgMap from '../script/svgmap.js'
    import Map from '../script/server/map.js'
    import App from '../script/app.js'

    export default {
        name: "Map",
        data: function () {
            return {
                prohibit: true,
                chooseMap: {id: 0, name: ''},
                maps: undefined
            }
        },
        mounted: function () {
            let component = this;
            component.getMapAndDraw();
            window.onresize = function temp() {
                component.getMapAndDraw()
            }
        },
        methods: {
            setMapFrameSize: function () {
                let drawFrame = $(".draw-frame");
                if ($(window).width() > Math.min($(window).height())) {
                    drawFrame.height($(window).height() - 35);
                } else {
                    drawFrame.height(Math.min($(window).height() - 35, drawFrame.width()));
                }
            },
            getMapAndDraw: function () {
                let component = this;
                this.setMapFrameSize();

                if (component.maps) {
                    component.drawMap(component.maps, true)
                } else {
                    Map.maps().then((res) => {
                        if (res.type !== 'danger') {
                            component.chooseMap = res.data[0];
                            component.maps = {
                                current: res.data[0],
                                discoveredMaps: res.data.slice(1)
                            };
                            component.drawMap(component.maps, false)
                        }
                    });
                }
            },
            drawMap: function (mapData, resize) {
                let component = this;
                SvgMap.drawMap($(".draw-frame"), 'drawing', mapData, function (map) {
                    component.prohibit = !SvgMap.reachable(map.id);
                    component.chooseMap = map;
                }, resize);
            },
            enterMap: function () {
                let component = this;
                Map.enter(component.chooseMap.id).then((res) => {
                    if (res.type === 'success') {
                        component.maps.current = component.chooseMap;
                        component.prohibit = !SvgMap.reachable(component.maps.current.id);
                        this.drawMap(component.maps, true);
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

    .map {
        user-select: none;
    }

    .action-button {
        height: 125px;
        margin-bottom: 15px;
    }

    .map-info {
        margin-bottom: 15px;
    }
</style>