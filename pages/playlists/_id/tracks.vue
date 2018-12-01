<template>
    <section class="container margin-15-0">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="22">
                <div class="margin-15-0">
                    <h1>{{playlistName}}</h1>
                </div>
                <div class="list">
                    <el-table
                        stripe
                        row-key="track.id"
                        :data="tracks.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        :default-sort = "{prop: 'track.name', order: 'crescent'}"
                        style="width: 100%">
                        <el-table-column
                            label="Name"
                            sortable
                            prop="track.name">
                        </el-table-column>
                        <el-table-column
                        label="Artists"
                        v-if="innerWidth > 424">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    {{ getArtists(scope.row.track.artists) }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="Album"
                            prop="track.album.name"
                            v-if="innerWidth >767">
                        </el-table-column>
                        <el-table-column
                            align="right">
                            <template slot-scope="scope">
                                <!-- <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button> -->
                                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </section>  
</template>
<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'
var moment = require('moment');
const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();
export default {
    data() {
        return {
            tracks: [],
            search: null,
            innerWidth: null,
            playlistName: null
        }
    },
    computed: {
        ...mapGetters(['playlists'])
    },
    methods: {
        ...mapActions(['displayFeedback']),

        getArtists(artists) {
            if(artists) {
            let names = '';
                for (var i=0;i<artists.length;i++) {
                    names += artists[i].name;
                    if (i+1 != artists.length)
                        names += ', ';
                }
                return names;
            }
            
        },
        handleDelete(index, row){
            const self = this;
            spotifyApi.removeTracksFromPlaylist(this.$route.params.id,[row.track.uri])
            .then(function(data) {
                if (data.req.status == '200') {
                    self.getPlaylistTracks();
                };
                self.displayFeedback(data.req)
            }, function(err) {
                self.displayFeedback(err)
            });
        },
        getPlaylistTracks() {
            const self = this;
            spotifyApi.getPlaylistTracks(this.$route.params.id)
            .then(function(data) {
                self.tracks = data.items
            }, function(err) {
                self.displayFeedback(err)
            });
        }
        
    },

    mounted () {
        spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
        this.getPlaylistTracks();

        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.innerWidth = window.innerWidth
            });
        });

        let aux = this.playlists.filter((playlist) => {
            return playlist.id === this.$route.params.id
        })
        this.playlistName = aux[0]? aux[0].name: '';
    }
}
</script>
<style lang="scss" scoped>

.margin-15-0{
    margin: 15px 0;
}
</style>
