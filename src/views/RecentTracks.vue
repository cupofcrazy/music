<template>
  <div class="recent-tracks" v-if="recentTracks">
    <div class="container">
      <a class="track" v-for="(recent, index) in recentTracks" :key="index" :href="recent.track.external_urls.spotify" v-scroll-y>
        <div class="track__image">
          <lazy-image :src="recent.track.album.images[0].url" :alt="recent.track.name" color="var(--accent-color)" :aspectRatio="1" />
        </div>
        <div class="track__details">
          <h2>{{ recent.track.name }}</h2>
          <p>{{ recent.track.artists[0].name }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { getRecentlyPlayed } from '@/api'


export default {
  name: 'RecentTracks',
  data: () => ({
    recentTracks: []
  }),
  async created() {
    const data = await getRecentlyPlayed(this.$store.state.credentials.accessToken)

    this.recentTracks = data.items;
  }
}
</script>

<style lang="scss" scoped>
.recent-tracks {
  padding: 1rem;
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @include desktop {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
.track {
  display: block;
  margin: 0 0 2rem 0;

  

  @include desktop {
    
  }
  &__image {
    /* width: 200px; */
    overflow: hidden;
    border-radius: 4px;
  }
  &__details {
    margin: 1rem 0 0 0;
    color: var(--accent-color);
    h2 {
      color: var(--accent-color);
      font-weight: 100;
    }
  }
}
</style>