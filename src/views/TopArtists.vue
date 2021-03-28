<template>
  <div class="artists">
    <div class="container" v-if="artists">
      <!-- <img v-for="artist in artists" :src="artist.images[0].url" alt="" width="120px" :key="artist.images[0].url"> -->
      <div class="artists__grid">
        <div class="artist" v-for="(artist, index) in artists" :key="index" v-scroll-bounce>
          <div class="artist__details">
            <div class="artist__image">
              <lazy-image :src="artist.images[0].url" :alt="artist.name" color="var(--accent-color)" :aspectRatio="1" />
            </div>
            <div class="artist__index"><span>{{ formatNumber(index+1) }}</span></div>
          </div>
          <div class="artist__info">
            <p class="artist__name">{{ artist.name  }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopArtists} from '@/api'


export default {
  data: () => ({
    artists: []
  }),
  methods: {
    formatNumber(number) {
      return number < 10 ? `0${number}` : number
    }
  },
  async created() {
    const artists = await getTopArtists(this.$store.state.credentials.accessToken)

    this.artists = artists.items;

    // console.log(this.artists)
  }
}
</script>

<style lang="scss" scoped>
.artists {
  overflow-x: hidden;
  .container {
    padding: 1rem;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;

    @include desktop {
      grid-template-columns: repeat(16, 1fr);
    }
  }
}

.artist {
  &:nth-of-type(1n) {
    grid-column: 1 / 4;
  }
  &:nth-of-type(2n) {
    grid-column: 5 / -1;
    // margin-top: 5rem;
  }
  &:nth-of-type(3n) {
    grid-column: 2 / -2;
  }
  @include desktop {
    &:nth-of-type(1n) {
      grid-column: 1 / 4;
    }
    &:nth-of-type(2n) {
      grid-column: 5 / 11;
      margin-top: 5rem;
    }
    &:nth-of-type(3n) {
      grid-column: 12 / -1;
    }
  }
  
  &__details {
    position: relative;
    margin: 1rem 0;
  }
  &__index {
    position: absolute;
    top: -5%;
    right: 5%;
    padding: 1rem;
    color: var(--main-color);
    background-color: var(--accent-color);
    width: 3rem;
    height: 3rem;
    @include center-items;
    border-radius: 10rem;

    @include desktop {
      width: 25%;
      height: 25%;
    }

    span {
      display: block;
      font-size: 1rem;
      font-weight: bold;

    }
  }
  &__name {
    margin: 0 auto;
    text-align: center;
    color: var(--accent-color);
    font-size: 1.25rem;
    font-weight: 600;

    @include desktop {
      font-size: 2.625rem;
    }
  }
  &__image {
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>