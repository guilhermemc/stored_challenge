<template>
    <div class="list">
        <el-table
            :data="tracks.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">

            <el-table-column
                label="Date"
                width="130">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ formatDate(scope.row.added_at) }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="Name"
                prop="track.name">
            </el-table-column>

            <el-table-column
            label="Artists">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <p>Album: {{ scope.row.track.album.name }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ getArtists(scope.row.track.artists) }}</el-tag>
                </div>
                </el-popover>
            </template>
            </el-table-column>
            <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="Type to search"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
var moment = require('moment');
const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();
export default {
    data() {
        return {
            tracks: []
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format("DD/MM/YYYY")
        },
        getArtists(artists) {
            let names = '';
            for (var i=0;i<artists.length;i++) {
                names += artists[i].name;
                if (i+1 != artists.length)
                    names += ', ';
            }
            return names;
        }
    },

    mounted () {
        spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
        const self = this;
        spotifyApi.getPlaylistTracks(this.$route.params.id)
        .then(function(data) {
            self.tracks = data.items
            console.log(data.items)
        }, function(err) {
            self.displayError(err.status)
        });
    },
}
</script>
<style lang="scss" scoped>

</style>
