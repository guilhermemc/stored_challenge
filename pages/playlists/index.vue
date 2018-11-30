<template>
    <section class="container">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="18">
                <paginated-list :list-data="playlists"/>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import {mapMutations, mapGetters,mapActions} from 'vuex'
import PaginatedList from '~/components/PaginatedList.vue'

const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();

export default {
    computed: {
        ...mapGetters([
            'accessToken',
            'refreshToken',
            'playlists'
        ]),
    },
    components: {
        PaginatedList,
    },
    mounted () {
        if (localStorage.getItem('accessToken')) {
            spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
            const self = this;
            spotifyApi.getUserPlaylists()
            .then(function(data) {
                self.SET_PLAYLISTS(data.items)
            }, function(err) {
                self.displayFeedback(err.status)
            });
        } else {
            this.$router.push('/');
        }
    },
    methods : {
        ...mapMutations(['SET_PLAYLISTS']),
        ...mapActions(['displayFeedback']),
    },
}
</script>

<style>

</style>
