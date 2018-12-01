<template>
    <div>
        <el-row type="flex" class="row-bg row-alert" justify="center">
            <el-col>
                <el-alert v-show="display" :type="type" show-icon :title="text" @close="display = false"></el-alert>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            display: false,
            type:'',
            text:'',
        }
    },
    created() {
        this.$nuxt.$on('SHOW_ALERT', data => {
            this.type = data.type;
            this.text = data.text;
            this.display = true;
        });
    },
    beforeDestroy() {
        this.$nuxt.$off('SHOW_ALERT');
            this.display = false;
    },
}
</script>
<style lang="scss" scoped>
    .row-alert {
        position: absolute;
        z-index: 2;
        width: 90%;
        margin: 1% 5%;
    }
</style>
