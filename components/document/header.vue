<template>
  <div id="header-document">
    <div id="back-color"></div>
  </div>
</template>

<script>
import mainMenu from "~/components/document/menu.vue";
export default {
  name: 'page-header-document',
  components: { mainMenu }
}
</script>

<style lang=scss scoped>
#header-document { 
  height: 30vh;
  min-height: 100px;
  background-image: url(/static/img.jpg);
  background-position: center center;
  
  #back-color {
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%; width: 100%;
  }
}
</style>
