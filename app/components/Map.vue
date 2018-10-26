<template>
    <div class="map row">
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div class="draw-frame">
                <div id="drawing"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 map-info">
            <table class="table table-bordered table-hover table-content-center table-striped">
                <tbody>
                <tr>
                    <th>123</th>
                    <td>123</td>
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
    import Map from '../script/map.js'

    function setMapFrameSize() {
        let drawFrame = $(".draw-frame");
        if ($(window).width() > Math.min($(window).height())) {
            drawFrame.height($(window).height() - 35);
        } else {
            drawFrame.height(Math.min($(window).height() - 35, drawFrame.width()));
        }
    }

    export default {
        name: "Map",
        data: function () {
            return {}
        },
        mounted: function () {
            setMapFrameSize();
            window.onresize = function temp() {
                //setMapFrameSize();
            };

            let maps = {current: 0, discoveredMaps: [0, 1, 2, 5, 6, 7, 11, 13, 14, 19, 21, 22, 23, 46]}

            Map.drawMap($(".draw-frame"), 'drawing', maps, function (id) {
                console.log("can " + (Map.reachable(id) ? "" : "not") + " go to map " + id);
            });
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
</style>