<template>
    <div class="map">
        map
    </div>
</template>

<script>

    import Message from '../script/message.js'
    import App from '../script/app.js'

    export default {
        name: "Map",
        data: function () {
            return {}
        },
        mounted: function () {

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
</style>