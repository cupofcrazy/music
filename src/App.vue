<template>
  <div id="app">
    <header-nav />
    <!-- <transition :name="transition" mode="out-in"> -->
      <router-view :key="$route.fullPath" />
    <!-- </transition> -->
  </div>
</template>

<script>
import HeaderNav from './components/layout/HeaderNav.vue'

export default {
  components: { HeaderNav },
  name: 'App',
  data: () => ({
    transition: ''
  }),
  watch: {
    '$route'(to, from) {
      const fromDepth = from.path.split('/').length
      const toDepth = to.path.split('/').length

      // console.log({ fromDepth, toDepth })

      this.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'

      // console.log({ name })
    }
  },
  created() {
    const theme = JSON.parse(localStorage.getItem('theme'))
    if (theme) {
      const { fg, bg } = theme
      document.documentElement.style.setProperty('--main-color', fg)
      document.documentElement.style.setProperty('--accent-color', bg)
    }
  },
  mounted() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  },
  computed: {
   
  }
}
</script>

<style lang="scss">
#app {
  font-family: $font-sans-serif, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
