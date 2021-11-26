<template>
  <div :class="`${!fluid && 'container mx-auto max-w-7xl sm:px-6 lg:px-8'} px-${px}`" :style=" !fluid ? '' : 'width: 100%'">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    px: {
      type: String,
      default: '4'
    }
  }
}
</script>

<style>

</style>
