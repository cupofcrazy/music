<template>
    <div ref="scroll">
      <discover-header v-if="!$route.meta.hideNavigation"/>
      <router-view :key="$route.fullPath"/>
    </div>
</template>

<script>
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.min.css'
import DiscoverHeader from '../components/layout/DiscoverHeader.vue'

export default {
  components: { DiscoverHeader },
  mounted() {
    // const scroll = new LocomotiveScroll({
    //   el: this.$refs.scroll,
    //   smooth: true
    // })
  }
    
}
</script>

<style lang="scss" scoped>

</style>