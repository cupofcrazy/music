<template>
  <div class="header">
    <div class="container">
      <ul class="header__links">
        <li v-for="route in routes" :key="route.name">
          <base-link :href="{ name: route.name }" >{{ route.text }}</base-link>
        </li>
      </ul>
      <div class="header__title">
        <transition-group :css="false" @enter="titleEnterTransition" @leave="titleLeaveTransition" mode="out-in" appear>
          <div class="header__text" v-if="isRouteName('TopTracks')" :key="1">
            <h1>Top</h1>
            <h1>Tracks</h1>
          </div>
          <div class="header__text" v-else-if="isRouteName('TopArtists')" :key="2">
            <h1>Top</h1>
            <h1>Artists</h1>
          </div>
          <div class="header__text" v-else-if="isRouteName('RecentTracks')" :key="3">
            <h1>Recent</h1>
            <h1>Played</h1>
            <!-- <h1>Tracks</h1> -->
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import BaseLink from '../base/BaseLink.vue'

export default {
  name: 'DiscoverHeader',
  components: { BaseLink },
  data: () => ({
    routes: [
      { name: 'TopTracks', text: 'Top Tracks'},
      // { name: 'RecentlyPlayed', text: 'Recently Played'},
      // { name: 'TopAlbums', text: 'Top Albums'},
      { name: 'TopArtists', text: 'Top Artists'},
      { name: 'RecentTracks', text: 'Recently Played Tracks'}
      
    ]
  }),
  methods: {
    titleEnterTransition(el, done) {
      gsap.from('.header__text h1', {
        duration: 1,
        stagger: .1,
        // xPercent: 10,
        yPercent: -100,
        // delay: .3,
        clipPath: 'inset(100% 0% 0% 0%)',
        // autoAlpha: 0,
        ease: 'expo.out',
        onComplete:() => done()
      })
    },
    titleLeaveTransition(el, done) {
      console.log('leaving')
      gsap.to('.header__text h1', {
        duration: 2,
        stagger: .1,
        yPercent: 100,
        // delay: .3,
        clipPath: 'inset(0% 0% 100% 0%)',
        // autoAlpha: 0,
        ease: 'expo.out',
        onComplete:() => done()
      })
    },
    isRouteName(name) {
      return this.$route.name === name
    }
  },
  computed: {
    
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 6rem 1rem 0rem 1rem;
  overflow: hidden;
  // position: sticky;
  // top: 0;
  // left: 0;
  // z-index: 300;
  background-color: var(--main-color);

  .container {
    display: flex;
    flex-direction: column;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid var(--accent-color);

    @include tablet {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }
  &__title {
    font-size: 2rem;
    color: var(--accent-color);
    text-transform: uppercase;
    line-height: 1;
    margin: 10vh 0 0 0;

    @include tablet {
      font-size: 5rem;
      margin: 0;
    }
  }
}
</style>