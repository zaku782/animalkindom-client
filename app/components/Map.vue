<template>
    <div class="map row">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div class="draw-frame">
                <div id="drawing"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 action-button">
            <button type="button" class="btn btn-success enter-map-button"
                    :disabled="prohibit" @click="enterMap">{{'enter'|msg}}
            </button>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 map-info">
            <table class="table table-bordered table-hover table-content-center table-striped">
                <tbody>
                <tr>
                    <th>{{'mapName'|msg}}</th>
                    <td>{{mapName}}</td>
                </tr>
                <tr>
                    <th>456</th>
                    <td>456</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import Message from '../script/message.js'
    import SvgMap from '../script/svgmap.js'
    import Map from '../script/server/map.js'

    export default {
        name: "Map",
        data: function () {
            return {
                prohibit: true,
                mapName: ''
            }
        },
        mounted: function () {
            let component = this;
            component.drawMap();
            window.onresize = function temp() {
                component.drawMap()
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
            drawMap: function () {

                let component = this;

                this.setMapFrameSize();

                Map.maps().then((res) => {
                    if (res.type !== 'danger') {

                        this.mapName = res.data[0].name;

                        SvgMap.drawMap($(".draw-frame"), 'drawing', {
                            current: res.data[0],
                            discoveredMaps: res.data.slice(1)
                        }, function (map) {
                            component.prohibit = !SvgMap.reachable(map.id);
                            component.mapName = map.name;
                        });
                    }
                });
            },
            enterMap: function () {
                console.log('enter!!')
            },
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
</style>