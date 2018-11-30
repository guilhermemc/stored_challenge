<template>
    <div>
        <el-row type="flex" class="row-bg row-alert" justify="center">
            <el-col :span="16">
                <el-alert v-show="display" :type="type" show-icon :title="text"></el-alert>
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
    },
}
</script>
<style lang="scss" scoped>
    .row-alert {
        position: absolute;
        z-index: 2
    }
</style>
