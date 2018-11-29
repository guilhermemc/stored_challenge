<template>
</template>

<script>


import {mapMutations} from 'vuex'

export default {
  methods : {
    ...mapMutations(['SET_ACCESS_TOKEN','SET_REFRESH_TOKEN']),
  },
  mounted () {
    this.SET_ACCESS_TOKEN(this.$route.query.access_token)
    this.SET_REFRESH_TOKEN(this.$route.query.refresh_token)
    this.$router.push('/playlist');
  }
}
</script>

<style>

</style>
