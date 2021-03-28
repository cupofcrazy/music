<template>
  <button class="base__button" @click="onClick">
    <span><slot /></span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
};
</script>

<style lang="scss" scoped>
.base__button {
  span {
    display: block;
    @include center-items;
  }
}
</style>