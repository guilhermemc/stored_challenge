<template>
  <section class="container">
    weoprwopejrowpejropwW
    {{accessToken}}
  </section>
</template>

<script>


import {mapMutations, mapGetters, mapActions} from 'vuex'
const Spotify = require('spotify-web-api-js');
const spotifyApi = new Spotify();

export default {
    computed: {
        ...mapGetters([
            'accessToken',
            'refreshToken',
        ])
    },
    methods : {
        ...mapMutations(['SET_ACCESS_TOKEN','SET_REFRESH_TOKEN']),
    },
    mounted () {
      console.log(this.$route.query.access_token)
        this.SET_ACCESS_TOKEN(this.$route.query.access_token)
        this.SET_REFRESH_TOKEN(this.$route.query.refresh_token)
        console.log(spotifyApi.setAccessToken(this.$route.query.access_token));

        spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
            if (err) console.error(err);
            else console.log('Artist albums', data);
        });
    }
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
