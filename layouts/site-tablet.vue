<template>
  <div id="layout-site-tablet">
    <page-header />
    <admin-menu />
    <main-menu />
    <nuxt id="content"/>
    <page-footer />
  </div>
</template>

<script>
import pageHeader from "~/components/header.vue";
import mainMenu   from "~/components/menu";
import adminMenu  from "~/components/menu-admin";
import pageFooter from "~/components/footer.vue";
export default {
  name: 'layout-site-tablet',
  components: {
    pageHeader,
    pageFooter,
    mainMenu,
    adminMenu
  },
  watch: {
    '$route'(PageRoute, from) {
      this.$root.$emit('transition')
    }
  }
}
</script>

<style lang=scss>
body, html { margin: 0px; padding: 0px; background-color: rgba(255, 255, 100, 0.1); background-image: url('/static/hi-400.png'); }
 #layout-site-tablet {
   min-height: 100vh;
   display: grid; grid-gap: 2rem;
   grid-template: 
    "header header header header" auto 
    ". admin-menu main-menu ." auto 
    ". content content ." auto 
    "footer footer footer footer" auto
    / 1rem 1fr 1fr 1rem;

   #header { grid-area: header }
   #main-menu { grid-area: main-menu }
   #admin-menu { grid-area: admin-menu }
   #content { grid-area: content; .card { margin-bottom: 1rem; } }
   #footer { grid-area: footer }
 }

 .menu {
    display: grid;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5); 

    .title {
      font-size: 1.2rem; font-style: italic; text-shadow: 2px 2px 10px grey;
      padding-bottom: .5rem;
    }

    a {
      color: rgb(100, 100, 100);
      text-decoration: none;
      padding: .2rem 0;
    }
  }

</style>

<style>
:root {
  --card-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);

  --select-background: rgba(100, 200, 0, .2);
  --main-background: transparent;
  --card-background: rgba(255, 255, 255, 0.5);

  --card-title-text-shadow: 5px 5px 10px grey;

  --main-color: black;
  --link-color: rgba(0, 0, 0, .8);
  --link-color-hover: rgba(0, 0, 0, .9);

  --gap: 1rem;

}
</style>
