<template>
    <div class="now-playing-widget" v-if="$store.state.isLoggedIn && currentTrack">
    <transition name="slide" mode="out-in">
      <button class= "button track-small-preview" @click="toggleTrackPreview" v-if="!showPreview">
        <div :class="`track-small-preview__image ${ isPlaying() ? 'rotate' : '' }`">
          <lazy-image :src="currentTrack.item.album.images[0].url" :alt="currentTrack.name" color="#8F8A84" :aspectRatio="1" />
        </div>
      </button>

      <div class="track" @click="showPreview=false" v-else>
        <div class="track__image">
          <lazy-image :src="currentTrack.item.album.images[0].url" :alt="currentTrack.name" color="#8F8A84" :aspectRatio="1" />
        </div>
        <div class="track__details">
          <div class="track__status">{{ isPlaying() ? 'Now Playing' : 'Last Played Track' }}</div>

          <div class="track__info">
            <p class="track__name">{{ currentTrack.item.name }}</p>
            <p class="track__artist">{{ currentTrack.item.artists[0].name }}</p>
          </div>
        </div>
      </div>
    </transition>
    </div>
</template>

<script>
import { getCurrentlyPlayingTrack } from '@/api'

export default {
  name: 'NowPlayingWidget',
  data: () => ({
    showPreview: false,
    currentTrack: null
  }),
  methods:  {
    toggleTrackPreview() {
      this.showPreview = true
    },
    isPlaying() {
      return this.currentTrack.is_playing
    }
  },
  async created() {
    console.log(this.$store.state.accessToken)
    this.currentTrack = await getCurrentlyPlayingTrack(this.$store.state.accessToken)
    console.log('help')
  }
}
</script>

<style lang="scss" scoped>
.now-playing-widget {
  overflow: hidden;
  width: 100%;
  
  .track {
    background-color: var(--accent-color);
    width: 100vw;
    display: grid;
    grid-template-columns: auto auto 2fr;
    gap: .5rem;
    padding: .25rem;

    @include desktop {
      width: 35vw;
    }

    &__name {
      font-weight: 600;
    }

    &__image {
      width: 8.625rem;
      height: 8.625rem;

      @include tablet {
        width: 10.625rem;
        height: 10.625rem;
      }
       @include desktop {
        width: 12rem;
        height: 12rem;
      }
    }
    &__details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--main-color);
      font-size: 1rem;
    }
    &-small-preview {
      display: block;
      margin: 1rem;

      &__image {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 100%;
      }
    }
  }
}
</style>