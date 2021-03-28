<template>
  <header class="header">
    <div class="container">
      <div class="header__logo">
        <base-link href="/">Tunes</base-link> 
      </div>
      <div class="header__button">
        <button @click="toggleMenu">
          <transition name="fade" mode="out-in" appear>
            <svg v-if="isMenuOpen" class="svg-close" x="0px" y="0px" width="23.29px"
              height="23.33px" viewBox="0 0 23.29 23.33" style="overflow:visible;enable-background:new 0 0 23.29 23.33;"
              xml:space="preserve">
              <line class="st0" x1="0.35" y1="0.35" x2="22.93" y2="22.98"/>
              <line class="st0" x1="22.93" y1="0.35" x2="0.35" y2="22.98"/>
            </svg>
            <!-- Generator: Adobe Illustrator 25.2.0, SVG Export Plug-In  -->
            <svg v-else class="svg-burger" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px"
              height="8px" viewBox="0 0 32 8" style="overflow:visible;enable-background:new 0 0 32 8;" xml:space="preserve">
              <line class="st0" x1="0" y1="0.5" x2="31.93" y2="0.5"/>
              <line class="st0" x1="0.07" y1="7.5" x2="32" y2="7.5"/>
            </svg>
          </transition>

          

        </button>
      </div>
    </div>
  </header>
</template>

<script>
import BaseLink from '../base/BaseLink.vue'

export default {
components: { BaseLink },
  data: () => ({
    isMenuOpen: false
  }),
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  z-index: 1000;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    color: var(--accent-color);
  }

  &__button {
    width: 32px;
    height: 32px;
    @include center-items;
     button {
       background-color: transparent;
       border: 0;
      }
    svg {
      width: 1.625rem;
      stroke: var(--accent-color);
    }
  }
}
</style>