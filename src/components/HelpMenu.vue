<template>
  <div class="help__menu">
    <div class="container">
      <transition name="slide-down">
        <div class="menu" v-show="menuOpen">
          <div class="menu__details">
            <p>
              Check your recent tracks, top tracks, and top artists.
              This website uses the Spotify API to access your music / profile.
              It is not being shared or used maliciously.

            </p>
          </div>
          <div class="menu__color-picker">
            <h3>Pick a Color Theme </h3>
            <div class="color-picker">
              <button class="color-picker-button round"
                v-for="(color, index) in colors"
                :key="index" :style="{ backgroundColor: color.fg, border: `4px solid ${color.bg}` }"
                
                @click="selectColor(color)"></button>
            </div>
          </div>
        </div>
      </transition>
      <button class="help-button" @click="toggleMenu">
        <transition name="slide-down" mode="out-in" appear>
          <span class="icon" v-if="!menuOpen">i</span>
          <span class="icon" v-else>x</span>
        </transition>
      </button>
    </div>
  </div>
</template>

<script>
import BaseButton from "./base/BaseButton.vue";

export default {
  components: { BaseButton },
  data: () => ({
    menuOpen: false,
    colors: {
      'default': { bg: '#111111', fg: '#FF916A' },
      'white': { bg: '#ffffff', fg: '#111111' },
      'red': { bg: '#D00303', fg: '#FFDDDD' },
      'blue': { bg: '#FDC95F', fg: '#9FC3D1' },
      'green': { bg: '#AED0CF', fg: '#1C706D'},
      'spotify': { bg: '#1DB95A', fg: '#111111' },
      'lime': { bg: '#F6E82B', fg: '#213263' },
      'pink': { bg: '#213263', fg: '#F874A3' }
    }
  }),
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    selectColor(color) {
      const { fg, bg } = color
      // console.log({ fg, bg })

      document.documentElement.style.setProperty('--main-color', fg)
      document.documentElement.style.setProperty('--accent-color', bg)

      localStorage.setItem('theme', JSON.stringify(color))

}
  }
};
</script>

<style lang="scss" scoped>
.menu {
  background-color: var(--accent-color);
  border-radius: 1rem;
  // width: 500px;
  max-width: 500px;
  padding: 1rem;
  transition: all 1s $easeOutExpo;
  margin: 0rem 0 1rem 0rem;
  visibility: visible;

  &__color-picker {
    h3 {
      // font-style: italic;
      margin: 1rem 0 .5rem 0;
      color: var(--main-color);
    }
  }

  &__details {
    p {
      color: var(--main-color);
    }
  }
}

.container {
  height: auto;
  transition: height .5s $easeOutExpo;
}
.color-picker {
  &-button {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: .5rem;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #111;
  }
}
.help-button {
  @include center-items;
  background-color: var(--accent-color);
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  span {
    display: block;
    color: var(--main-color);
    font-size: 1.25rem;
  }
}
</style>