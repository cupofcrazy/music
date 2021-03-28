<template>
  <div class="top-tracks">
    <div class="container" v-if="tracks">
      <div class="track" v-for="(track, index) in tracks"  :key="track.id" v-scroll-y>
        <div class="container">
          <div class="track__image">
            <lazy-image :src="track.album.images[0].url" :alt="track.name" color="var(--accent-color)" :aspectRatio="1" />
            <div class="track__index">{{ formatNumber(index+1) }}</div>
          </div>
          <div class="track__details">
            <p class="track__name">{{ track.name }}</p>
            <p class="track__artist">{{ track.artists[0].name }}</p>
          </div>
            <button class="track__link" @click="playPreview(track.preview_url)">
              <div class="track__icon">
                  <icon-arrow color="var(--main-color)" />
              </div>
            </button>
        </div>
      </div>
      <audio :src="audioUrl" ref="audioRef"></audio>
    </div>
  </div>
</template>

<script>
import { Howl, Howler } from 'howler'
import { getTopTracks } from '@/api'
import IconArrow from '../components/icons/IconArrow.vue';
// const Vibrant = require('node-vibrant')

export default {
  components: { IconArrow },
  data: () => ({
    audioUrl: null,
    audioPlaying: false,
    tracks: []
  }),
  async created() {
    const data = await getTopTracks(this.$store.state.credentials.accessToken)

    const tracks = data.items;
    this.tracks = tracks;
  },
  mounted() {
    // this.getPalette('https://i.scdn.co/image/ab67616d0000b2737607aa9ae7904e1b12907c93')
  },
  methods: {
    playPreview(url) {
      this.$refs.audioRef.src = url

      if (!this.audioPlaying) {
        this.$refs.audioRef.play()

      } else {
        this.audioPlaying = false
      }

    },
    formatNumber(number) {
      return number < 10 ? `0${number}` : number
    },
    getPalette(src) {
      const colors = Vibrant.from(src)
        .useQuantizer(Vibrant.Quantizer.WebWorker)
        .getPalette()
        .then(palette => console.log(palette))
    }
  }
}
</script>

<style lang="scss" scoped>
.top-tracks {
  padding: 0 1rem;
}
.track {
  // margin: 1rem 0;
  border-bottom: 1px solid var(--accent-color);
  padding: .5rem 0;
  // max-width: 600px;
  margin: 0 auto;

  .container {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: .75rem;
  }

  &__image {
    width: 100px;
    overflow: hidden;
    border-radius: .25rem;
    position: relative;

    @include desktop {
      width: 16rem;
    }
    
  }
  &__details {
    color: var(--accent-color);

    @include desktop {
      font-size: 2rem;
    }
  }
  &__name {
    font-weight: 600;
    width: 80%;
  }

  &__index {
    position: absolute;
    left: .5rem;
    bottom: .5rem;
    color: #FFF;
  }
  &__link {
    width: 3rem;
    height: 3rem;
    background-color: var(--accent-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    align-self: center;

    @include desktop {
      width: 8rem;
      height: 8rem;
    }
  }
  &__icon {
    svg {
      width: 1rem;
      height: auto;

      @include desktop {
        width: 3rem;
        height: auto;
      }
    }
  }
}
</style>