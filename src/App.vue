<template>
  <div id="app">
    <calendar></calendar>
  </div>
</template>

<script>
  import Calendar from './Calendar.vue'
  export default {
    name: 'app',
    components: {
      Calendar
    }
  }
</script>

<style>
  #app {
    max-width: 100%;
  }
</style>
