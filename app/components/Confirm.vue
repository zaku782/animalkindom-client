<template>
    <div class="modal" id="common_confirm" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="title">
                        <strong>{{title}}</strong>
                    </div>
                </div>

                <div class="prompt">
                    {{prompt}}
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
                        {{ 'confirm_no' | msg }}
                    </button>
                    <button type="button" class="btn btn-success btn-sm" @click="">
                        {{ 'confirm_yes' |msg }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Message from '../script/message.js'

    export default {
        name: "Confirm",
        props: ['title', 'prompt'],
        mounted: function () {
            //$(".modal").modal('hide');
        },
        filters: {
            msg: Message.filters
        }
    }
</script>

<style scoped>

</style>