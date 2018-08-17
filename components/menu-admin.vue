<template>
  <div id="admin-menu" class="menu">
    <div class="title">Управление, {{isAuth ? $store.getters.USER.Login : ''}}</div>
    <template v-if="isAuth">
      <nuxt-link :to="`/Edit/${$route.params.Path}`"> Изменить </nuxt-link>
      <nuxt-link to="/propertis"> Настройки </nuxt-link>
      <nuxt-link to="/profile"> Профиль </nuxt-link>
      <nuxt-link to="/logout"> Выйти </nuxt-link>
    </template>
    <template v-else>
      <nuxt-link to="/auth"> Авторизация </nuxt-link>
      <nuxt-link to="/reg"> Регистрация </nuxt-link>
    <nuxt-link to="/propertis"> Настройки </nuxt-link>
    </template>
  </div>
</template>
<script>
export default {
  name: 'admin-menu',
  computed: {
  }
}
</script>

<style lang=scss scoped>
</style>
