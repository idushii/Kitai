<template>
  <div class="menu">
    <div class="links-pages">
      <nuxt-link to="/">Назад</nuxt-link>
    </div>
    <div></div>
    <div class="links-action">
      <nuxt-link to="/">Сохранить</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-menu',
}
</script>

<style lang="scss" scoped>
  .menu {
    display: grid; grid-template-columns: auto 1fr auto;
    padding: 0px; 

    .links-pages, .links-action {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      background-color: rgba(255, 255, 255, 0.8);
      padding: .5rem;
    }

    a { color: black; text-align: center; }
  }

</style>
