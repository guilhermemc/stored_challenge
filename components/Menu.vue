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
                sessionStorage.clear();

                this.deleteAllCookies();
                this.$router.push('/');
                this.activeIndex = '/playlists';
            } else if (key == '/playlists') {
                this.$router.push(key);
            }
        },
        deleteAllCookies() {
            var cookies = document.cookie.split(";");
            console.log(cookies)
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
