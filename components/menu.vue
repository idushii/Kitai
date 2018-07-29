<template>
  <div id="main-menu" class="menu">
    <div class="title">Навигация</div>
    <nuxt-link v-for="page in $store.getters.menu" :key="`page-${page.id}`" :to="`/Page/${page.Path}`"> {{page.Title}} </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'main-menu',
  async fetch({store, params}) {
    console.log('fetch')
    let { data } = await axios.post('/api/pages')
    return store.commit('SET_MENU', data)
  }
}
</script>
