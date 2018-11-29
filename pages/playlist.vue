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
import {mapMutations, mapGetters, mapActions} from 'vuex'
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
    methods : {
        ...mapMutations(['SET_PLAYLISTS']),
    },
    mounted () {
        spotifyApi.setAccessToken(this.accessToken);
        const self = this;
        spotifyApi.getUserPlaylists()
        .then(function(data) {
            self.SET_PLAYLISTS(data.items)
            console.error(data.items);
        }, function(err) {
            console.error(err);
        });

        // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
        //     if (err) console.error(err);
        //     else console.log('Artist albums', data);
        // });
    }
}
</script>

<style>

</style>
