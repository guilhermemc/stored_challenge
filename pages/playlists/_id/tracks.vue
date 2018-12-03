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
                    <h1>
                        {{playlistName}}
                        <el-button class="edit-name" type="text" icon="el-icon-edit" @click="showChangeName = true"></el-button>
                    </h1>
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
            :width="innerWidth > 424?'70%':'90%'"
            :before-close="handleAddTrack">
            <input type="text"
                class="search-input"
                v-model="trackName"
                v-on:keyup="querySearchAsync"
                placeholder="Search by name ..."
            >
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
                        :align="innerWidth > 424?'right':'center'">
                        <template slot-scope="scope">
                            <el-button class="btn-track" v-if="!belongsToPlaylist(scope.row.id)" size="mini" type="success" icon="el-icon-plus" :round="innerWidth > 424" :circle="innerWidth < 425" @click="addTrack(scope.$index, scope.row)">{{innerWidth > 424?' Add':''}}</el-button>

                            <el-button class="btn-track" v-else disabled size="mini" type="success" icon="el-icon-check" plain :round="innerWidth > 424" :circle="innerWidth < 425" @click="addTrack(scope.$index, scope.row)">{{innerWidth > 424?' Already Added':''}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showAddTracks = false; trackName = null;suggestionTracks = []">Done</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="Name your playlist"
            :visible.sync="showChangeName"
            width="50%"
            :before-close="closeChangeName">
            <el-input
                v-model="playlistNewName"
                clearable
                autofocus=true>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showChangeName = false">Cancel</el-button>
                <el-button type="primary" @click="changeName">Save</el-button>
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
            showChangeName: false,
            playlistNewName: null,
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
        getPlaylistDetails() {
            const self = this;
            spotifyApi.getPlaylist(this.$route.params.id)
            .then(function(data) {
                self.playlistName = data.name;
            }, function(err) {
                self.displayFeedback(err)
            });
        },
        addTrack(index, row) {
            const self = this;
            spotifyApi.addTracksToPlaylist(this.$route.params.id,[row.uri])
            .then(function(data) {
                if (data.req.status == '201') {
                    self.getPlaylistTracks();
                };
                self.displayFeedback(data.req)
            }, function(err) {
                self.displayFeedback(err)
            });
        },
        querySearchAsync() {
            const self = this;
            if (this.trackName) {
                spotifyApi.searchTracks(this.trackName)
                .then(function(data) {
                    self.suggestionTracks = data.tracks.items
                }, function(err) {
                    self.displayFeedback(err)
                });
            }
        },
        handleAddTrack(){
            this.trackName = null
            this.suggestionTracks = []
            this.showAddTracks = false
        },
        closeChangeName(){
            this.showChangeName = false
            this.playlistNewName = null
        },
        belongsToPlaylist(id) {
            let aux = this.tracks.filter((track) => {
                return track.track.id === id
            });

            if (aux != '')
                return true;

            return false;
        },
        changeName() {
            const self = this;
            spotifyApi.changePlaylistDetails(this.$route.params.id,{name: this.playlistNewName})
            .then(function(data) {
                self.playlistName = self.playlistNewName
                self.showChangeName = false;
            }, function(err) {
                self.displayFeedback(err)
            });
        }
    },

    mounted () {
        spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
        this.getPlaylistDetails();
        this.getPlaylistTracks();

        this.innerWidth = window.innerWidth
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
    .search-input {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;

        &:hover {
            border-color: #c0c4cc;
        }
        &:focus {
            border-color:#409EFF;
        }
    }
    .edit-name {
        margin-left: 25px;
        color:#909399;
        &:hover {
            color:#409EFF;
        }
    }

    /deep/ .btn-track [class*=el-icon-]+span {
        margin-left: 0px !important;
    }
</style>
