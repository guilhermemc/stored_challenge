<template>
    <section class="container margin-15-0">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="22">
                <el-button class="right" type="success" icon="el-icon-plus" @click="showAddTracks = true">
                     Add Track
                </el-button>
            </el-col>
        </el-row>
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
        <el-dialog
            title="Add Track to Playlist"
            :visible.sync="showAddTracks"
            width="70%">
            <input type="text" v-model="trackName" v-on:keyup="querySearchAsync">
            <div>
                <el-table
                        stripe
                        row-key="id"
                        :data="suggestionTracks"
                        style="width: 100%">
                        <el-table-column
                            label="Name"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                        label="Artists">
                            <template slot-scope="scope">
                                <div slot="reference" class="name-wrapper">
                                    {{ getArtists(scope.row.artists) }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="right">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" icon="el-icon-check" plain round @click="addTrack(scope.$index, scope.row)">Add</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showAddTracks = false">Done</el-button>
            </span>
        </el-dialog>
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
            playlistName: null,
            showAddTracks: false,
            trackName: null,
            suggestionTracks: []
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
        },
        addTrack() {

        },
        querySearchAsync() {
            const self = this;
            spotifyApi.searchTracks(this.trackName)
            .then(function(data) {
                self.suggestionTracks = data.tracks.items
            }, function(err) {
                self.displayFeedback(err)
            });
        },
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
    .right {
        float: right;
    }
</style>
