<template>
  <div id="app">
    <spec-selector></spec-selector>
  </div>
</template>

<script>
  import specSelector from './components/spec-selector.vue'
  export default {
    name: 'app',
    components: {
        'spec-selector': specSelector
    },
  }
</script>

<style scoped>

</style>
