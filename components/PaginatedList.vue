<template>
    <div class="list">
        <el-row type="flex wrap" class="row-bg" style="display: flex; flex-wrap: wrap;" justify="space-around" :gutter="20">
            <el-col class="col-card" :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="playlist in paginatedData" :key="playlist.id">
                <el-card class="card-playlist" :body-style="{ padding: '0px' }" v-on:click.native="getTracks(playlist.id)">
                    <img :src="playlist.images[0].url" class="image">
                    <div style="padding: 14px;">
                        <span>{{playlist.name}}</span>
                        <div class="bottom clearfix">
                        <span class="time">{{ playlist.owner.display_name }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-button-group class="center">
            <el-button type="primary" icon="el-icon-arrow-left"  @click="prevPage" :disabled="pageNumber==0">
                Previous Page
            </el-button>
            <el-button type="primary" @click="nextPage" :disabled="pageNumber > pageCount -1">
                Next Page
                <i class="el-icon-arrow-right el-icon-right"></i>
            </el-button>
        </el-button-group>
    </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();
export default {
    data() {
        return {
            pageNumber: 0,
        }
    },
    props:{
        listData:{
            type:Array,
            required:true
        },
        size:{
            type:Number,
            required:false,
            default: 6
        }
    },
    computed: {
        pageCount(){
            let l = this.listData.length,
                s = this.size;
            return Math.floor(l/s);
        },
        paginatedData(){
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.listData.slice(start, end);
        }
    },
    methods : {
        ...mapMutations(['SET_TRACKS']),
        nextPage(){
            this.pageNumber++;
        },
        prevPage(){
            this.pageNumber--;
        },
        getTracks(playlistId) {
            this.$router.push('playlists/'+playlistId+'/tracks');
        }
    },
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

  .button {
    padding: 0;
    float: right;
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
    flex: 1 0 33%;
    align-items: stretch;
    margin-bottom: 15px;
  }
  .center {
      display: flex;
      justify-content: center;
  }
</style>
