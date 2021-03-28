<template>
  <div class="home">
    <div class="container">
      <div class="home__intro">
        <div class="home-grid">
          <div class="row">
            <h1 class="home__title">YOUR</h1>
            <div class="home__image"></div>
          </div>
          <div class="row">
            <div class="home__image"></div>
            <h1 class="home__title">SPOTIFY</h1>
          </div>
          <div class="row">
            <h1 class="home__title">TRACKS</h1>
            <div class="home__image"></div>
          </div>
        </div>
        <div class="home__button">
          <base-button @click="handleLogin" v-if="!$store.state.isLoggedIn">
          <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" width="34.875" height="34.875" viewBox="0 0 34.875 34.875">
            <path id="Icon_awesome-spotify" data-name="Icon awesome-spotify" d="M17.438.563A17.438,17.438,0,1,0,34.875,18,17.444,17.444,0,0,0,17.438.563Zm7.08,25.657a1.342,1.342,0,0,1-.752-.253c-4.388-2.644-9.492-2.756-14.534-1.723a4.54,4.54,0,0,1-.837.183,1.1,1.1,0,0,1-1.111-1.111,1.114,1.114,0,0,1,.956-1.181C14,20.862,19.884,20.974,24.9,23.977a1.189,1.189,0,0,1,.682,1.16,1.062,1.062,0,0,1-1.069,1.083Zm1.891-4.612a1.736,1.736,0,0,1-.865-.3A22.786,22.786,0,0,0,8.768,19.245a2.9,2.9,0,0,1-.837.183,1.365,1.365,0,0,1-1.364-1.364,1.383,1.383,0,0,1,1.09-1.455,23.65,23.65,0,0,1,6.877-.956,24.613,24.613,0,0,1,12.445,3.2,1.466,1.466,0,0,1,.795,1.385,1.362,1.362,0,0,1-1.364,1.371Zm2.18-5.358a1.617,1.617,0,0,1-.907-.274c-5.006-2.988-13.957-3.705-19.751-2.088a3.34,3.34,0,0,1-.907.183A1.623,1.623,0,0,1,5.386,12.41a1.661,1.661,0,0,1,1.223-1.68,29.469,29.469,0,0,1,8.262-1.069c5.133,0,10.512,1.069,14.442,3.361a1.651,1.651,0,0,1,.907,1.589,1.629,1.629,0,0,1-1.631,1.638Z" transform="translate(0 -0.563)"/>
          </svg>

          Login with Spotify
          </base-button>
          <!-- <a class="base__button" href="/discover/top-artists">Login</a> -->
          <base-button @click="$router.push({ name: 'TopTracks' })" v-else>Discover</base-button>
        </div> 
      </div>
    </div>
    <div class="home__help bottom-left">
      <help-menu />
    </div>
    <!-- <div class="home__details bottom-right" v-if="$store.state.isLoggedIn">
      <now-playing-widget />
    </div> -->
  </div>
</template>

<script>
import gsap from "gsap";
import BaseButton from "../components/base/BaseButton.vue";
import NowPlayingWidget from "../components/NowPlayingWidget.vue";
import HelpMenu from '../components/HelpMenu.vue';
import { authorize } from '@/api' 
import { getHashParams } from '@/utils'

export default {
  name: "Home",
  data: () => ({
    currentTrack: null,
  }),
  components: {
    BaseButton,
    NowPlayingWidget,
    HelpMenu,
  },
  methods: {
    async handleLogin() {
      window.location = authorize()
    }
  },
  async mounted() {
    const params = getHashParams()
    const { access_token } = params

    if (access_token) {
      console.log({ params })
      this.$store.commit('SET_ACCESS_TOKEN', access_token)
      this.$store.commit('SET_USER_LOGGED_IN', true)
    }
    window.location.hash = ''

    const tl = new gsap.timeline();
    tl.from(".home__title", {
      duration: 2,
      stagger: 0.1,
      xPercent: 10,
      yPercent: 100,
      clipPath: "inset(0% 0% 100% 0%)",
      ease: "expo.inOut",
    })
      .from(
        [".home__image", '.home__help'],
        {
          duration: 2,
          stagger: 0.1,
          scale: 0,
          autoAlpha: 0,
          ease: "elastic.out",
        },
        "<.75"
      )
      .from(".home__button", {
          duration: 1,
          stagger: .05,
          y: 45,
          scale: 0,
          ease: "elastic.out",
          autoAlpha: 0,
        },"<.1");
  },
  beforeRouteLeave(to, from, next) {
    gsap.to(".home", {
      duration: 0.5,
      ease: "expo.out",
      clipPath: "inset(100% 0% 0% 0%)",
      onComplete: () => next(),
    });
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.home {
  
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  .container {
    display: flex;
    align-items: center;
  }
  &__intro {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
  }
  &-grid {
  }
  &__title {
    letter-spacing: -0.1rem;
    line-height: 1;
    color: var(--accent-color);
    font-size: 4.625rem;

    @include tablet {
      font-size: 8rem;
    }
    @include desktop {
      font-size: 10rem;
    }
  }
  &__image {
    width: 4.25rem;
    height: 4.25rem;
    background-image: url("~@/assets/images/hero.jpg");
    background-size: cover;
    border-radius: 0.25rem;

    @include tablet {
      width: 6rem;
      height: 6rem;
    }
    @include desktop {
      width: 8rem;
      height: 8rem;
    }
  }
  &__button {
    margin: 1rem auto;
  }
  &__details {
    position: absolute;
    right: 0rem;
    bottom: 0rem;
    color: var(--accent-color);
    font-size: 0.85rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  &__help {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 5;
    padding: 1rem;
  }
}

.row {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:nth-of-type(1) {
    margin-left: 20%;
  }
  &:nth-of-type(3) {
    margin-left: 20%;
  }
}
</style>