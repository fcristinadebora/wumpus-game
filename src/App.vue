<template>
  <div id="app">
    <pagina></pagina>
    <notifications group="foo" position="top left" />
  </div>
</template>

<script>
import Pagina from './components/Pagina.vue'

export default {
  name: 'App',
  components: {
    Pagina
  }
}
</script>

<style lang="scss">
@import './assets/styles/bootstrap';
</style>
