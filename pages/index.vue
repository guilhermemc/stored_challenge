<template>
  <section class="container">
    <div>
      <el-col :span="24">
        <div class="grid-content">
          <img src="~/assets/img/logo.svg" width="200px">
        </div>
      </el-col>
      <el-col :span="24">
      <h1 class="title">
        stored_challenge
      </h1>
      </el-col>
      <el-col :span="24">
      <h2 class="subtitle">
        Job interview
      </h2>
      </el-col>
      <el-col :span="24">
        <a :href="linkApi">
          <el-button type="success">Let's go!</el-button>
        </a>
      </el-col>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      linkApi : process.env.BASE_URL +'/api'
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  // font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  //   'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  font-size: 22px;
  color: #35495e;
  letter-spacing: 3px;
  padding-top: 15px;
}

.subtitle {
  font-weight: 300;
  font-size: 16px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 25px;
}
</style>
