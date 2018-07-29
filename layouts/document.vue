<template>
  <div id="layout-site-document">
    <page-header-document />
    <nuxt id="content" />
  </div>
</template>

<script>
import pageHeaderDocument from "~/components/document/header.vue";
export default {
  name: 'layout-site-admin',
  components: {
    pageHeaderDocument,
  }
}
</script>

<style lang=scss scoped>
body, html { margin: 0px; padding: 0px; background-color: rgba(255, 255, 100, 0.1); background-image: url('/static/hi-400.png'); }
 #layout-site-document {
   min-height: 100vh;

  #content { 
    margin: 0px auto; margin-top: -25vh;
    min-width: 900px; width: 80vw; 
    background-color: white; 
    /*min-height: 80vh;*/
  }

 }

</style>
