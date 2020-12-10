<template>
  <div class="logo-container">
    <img
    class="logo"
    src="/logo.svg"
    height="25%"    
    ></img>
  </div>
</template>

<script>
    export default {
        props: ['height', 'width'],
    }
</script>

<style scoped>
    .logo {}
    
    .logo-container {
        display: inline-block;
        position: relative;
    }
</style>