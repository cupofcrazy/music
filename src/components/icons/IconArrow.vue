<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="58.121" height="50.121" viewBox="0 0 58.121 50.121">
    <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(-7.5 -6.439)">
      <path id="Path_3" data-name="Path 3" d="M7.5,18h56" transform="translate(0 13.5)" fill="none" :stroke="color" stroke-linejoin="round" stroke-width="2"/>
      <path id="Path_4" data-name="Path 4" d="M18,7.5l24,24-24,24" transform="translate(21.5 0)" fill="none" :stroke="color" stroke-width="2"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'IconArrow',
  props: {
    color: {
      type: String,
      required: false,
      default: '#FFF'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>