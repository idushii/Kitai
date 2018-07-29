<template>
  <div id="admin-menu" class="menu">
    <div class="title">Управление, {{isUser ? isUser.username : ''}}</div>
    <template v-if="isUser">
      <nuxt-link :to="`/Edit/${$route.params.Path}`"> Изменить </nuxt-link>
      <nuxt-link to="/propertis"> Настройки </nuxt-link>
      <nuxt-link to="/logout"> Выйти </nuxt-link>
    </template>
    <template v-else>
      <nuxt-link to="/auth"> Авторизация </nuxt-link>
    <nuxt-link to="/propertis"> Настройки </nuxt-link>
    </template>
  </div>
</template>
<script>
export default {
  name: 'admin-menu',
  computed: {
    isUser() { return this.$store.getters.USER }
  }
}
</script>

<style lang=scss scoped>
</style>
