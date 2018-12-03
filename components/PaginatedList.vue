<template>
    <div class="list">
        <el-row type="flex wrap" class="row-bg flex-wrap display-flex" justify="space-around" :gutter="20">
            <el-col class="col-card" :xs="24" :sm="8" :md="8" :lg="6" :xl="6" v-for="playlist in paginatedData" :key="playlist.id">
                <el-card class="card-playlist" :body-style="{ padding: '0px' }" v-on:click.native="getTracks(playlist.id)">
                    <img v-if="playlist.images[0]" :src="playlist.images[0].url" class="image">
                    <div style="padding: 14px;">
                        <span>{{playlist.name}}</span>
                        <div class="bottom clearfix">
                        <span class="time">{{ playlist.owner.display_name }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg flex-wrap" justify="space-around">
            <el-col :xs="24" :sm="12" :class="innerWidth < 425?'align-center':''">
                <el-button type="success" class="btn-playlist" icon="el-icon-plus" @click="showCreatePlaylist = true">
                     Create Playlist
                     </el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :class="innerWidth < 425?'align-center':'align-right'">
                <el-button-group class="btn-playlist">
                    <el-button type="primary" icon="el-icon-arrow-left"  @click="prevPage" :disabled="pageNumber==0">
                        {{innerWidth > 424?'Previous Page':''}}
                    </el-button>
                    <el-button type="primary" @click="nextPage" :disabled="pageNumber > pageCount -1">
                        {{innerWidth > 424?'Next Page':''}}
                        <i class="el-icon-arrow-right el-icon-right"></i>
                    </el-button>
                </el-button-group>
                </el-col>
        </el-row>
        <el-dialog
            title="Name your playlist"
            :visible.sync="showCreatePlaylist"
            width="50%"
            :before-close="closeCreatePlaylist">
            <el-input
                v-model="playlistName"
                clearable
                autofocus=true>
            </el-input> 
            <span slot="footer" class="dialog-footer">
                <el-button @click="showCreatePlaylist = false">Cancel</el-button>
                <el-button type="primary" @click="createPlaylist()">Save</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'
const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();
export default {
    data() {
        return {
            pageNumber: 0,
            showCreatePlaylist: false,
            playlistName: '',
            innerWidth: null,
        }
    },
    props:{
        size:{
            type:Number,
            required:false,
            default: 6
        }
    },
    computed: {
        ...mapGetters(['playlists']),
        pageCount(){
            let l = this.playlists.length,
                s = this.size;
            return Math.floor(l/s);
        },
        paginatedData(){
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.playlists.slice(start, end);
        }
    },
    methods : {
        ...mapMutations(['SET_PLAYLISTS']),
        ...mapActions(['displayFeedback']),
        nextPage(){
            this.pageNumber++;
        },
        prevPage(){
            this.pageNumber--;
        },
        getTracks(playlistId) {
            this.$router.push('playlists/'+playlistId+'/tracks');
        },
        closeCreatePlaylist(done) {
            this.showCreatePlaylist = false;
        },
        createPlaylist() {
            this.showCreatePlaylist = false
            spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

            const self = this;
            spotifyApi.createPlaylist({name: this.playlistName})
            .then(function(data) {
                if (data.req.status == 201) {
                    spotifyApi.getUserPlaylists()
                    .then(function(data) {
                        self.SET_PLAYLISTS(data.items)
                        self.displayFeedback(data.req)
                    }, function(err) {
                        self.displayFeedback(err.status)
                    });
                    self.getTracks(data.id)
                }
            }, function(err) {
                self.displayFeedback(err)
            });
        }
    },
    mounted () {
        this.innerWidth = window.innerWidth;
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.innerWidth = window.innerWidth
            });
        });
    }
}
</script>
<style lang="scss" scoped>
    .list {
        margin: 25px;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .time {
        font-size: 13px;
        color: #999;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .image {
        width: 100%;
        display: block;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .card-playlist {
        height: 100%;
        cursor: pointer;
    }
    .col-card{
        min-width: 200px;
        max-width: 400px;
        flex: 1 0 33%;
        align-items: stretch;
        margin-bottom: 15px;
    }
    .btn-playlist{
        margin-bottom: 15px;
    }
    .flex-wrap {
        flex-wrap: wrap;
    }
    .display-flex{
        display: flex;
    }
    .align-center{
        text-align: center;
    }
    .align-right{
        text-align: right;
    }
</style>
