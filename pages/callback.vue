<template>
  <section class="container">
    {{token}}
  </section>
</template>

<script>
import {mapMutations, mapGetters, mapActions} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'token',
        ])
    },
    methods : {
        ...mapMutations(['SET_TOKEN'])
    },
    mounted () {
        this.SET_TOKEN(this.$route.query.code)
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
