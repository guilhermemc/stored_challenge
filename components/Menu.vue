<template>
    <div>
        <el-row>
            <el-col :span="24" class="menu">
                <nuxt-link to="/playlists">
                    <div class="menu-item" :class="$route.name =='playlists'?'active':''">Playlists</div>
                </nuxt-link>
                <div class="menu-item right" @click="logout">Logout</div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
    .menu-item {
        float: left;
        height: 60px;
        line-height: 60px;
        margin: 0;
        border-bottom: 2px solid transparent;
        position: relative;
        -webkit-box-sizing: border-box;
        white-space: nowrap;
        list-style: none;
        font-size: 14px;
        color: #606266;
        padding: 0 20px;
        cursor: pointer;
        transition: border-color .3s,background-color .3s,color .3s;
        box-sizing: border-box;
        .disabled {
            color: #909399;
        }
        &:hover {
            color: #303133
        }
    }
    .menu {
        border-bottom: #DCDFE6 1px solid;
    }
    .right{
        float: right;
    }
    .active{
        border-bottom: 2px solid #409EFF !important;
        color: #303133 !important;
    }
</style>
