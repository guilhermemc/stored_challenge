<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item vue-router="true" index="/playlists">Playlists</el-menu-item>
            <el-menu-item class="right" index="logout">Logout</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/playlists'
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        if (key == 'logout') {
            localStorage.removeItem('accessToken');
            localStorage.setItem('accessToken', null);
            localStorage.clear();
            this.$router.push('/');
            this.activeIndex = '/playlists';
        } else if (key == '/playlists') {
            this.$router.push(key);
        }
      }
    }
}
</script>

<style scoped>
    .right{
        float: right;
    }
</style>
