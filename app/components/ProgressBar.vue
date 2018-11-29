<template>
    <div class="progress">
        <div :class="color" role="progressbar" aria-valuemin="0"
             :style="barPercent">
            {{value}}/{{base}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProgressBar",
        props: ['color', 'value', 'base'],
        computed: {
            barPercent: function () {
                return "width:" + Math.round(this.value / this.base * 100) + "%";
            }
        }
    }
</script>

<style scoped>
    .progress {
        margin-bottom: 0;
        border-radius: 0;
        height: unset;
    }
</style>