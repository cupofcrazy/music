<template>
    <router-link class="base__link" :to="href">
      <span class="base__link-circle"></span>
      <span class="base__link-text">
        <slot />
      </span>
    </router-link>
</template>

<script>
  export default {
    name: 'BaseLink',
    props: {
      href: {
        type: [ String, Object ],
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.base__link {
  color: var(--accent-color);
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin: .25rem 0;

  &-circle {
    // display: none;
    width: 0rem;
    height: 0rem;
    border: 1px solid var(--accent-color);
    border-radius: 10rem;
    // background-color: var(--accent-color);
    
    transform: scale(0);
    transition: all .5s ease;
  }
  &-text {
    transition: all .5s ease;
    color: var(--accent-color);
    opacity: .5;
  }
  &.router-link-exact-active {
    transition: all .5s ease;
    .base__link-circle {
      // display: block;
      background-color: var(--accent-color);
      width: 1rem;
      height: 1rem;
      margin: 0 .5rem 0 0;
      transform: scale(1);
      transition: all .5s ease;
    }
    .base__link-text {
      transition: all .5s ease;
      opacity: 1;
      color: var(--accent-color);
    }
  }

  
}
</style>