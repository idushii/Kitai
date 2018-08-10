<template>
  <div id="main-menu" class="menu">
    <div class="title">Навигация</div>
    <template v-for="page in $store.getters.menu" >
      <nuxt-link :key="`page-${page.id}`" :to="`/Page/${page.Path}`"> {{page.Title}} </nuxt-link>
      <template v-if="page.Categoris && page.Categoris.length > 1">
        <nuxt-link v-for="Cat in page.Categoris" :key="`page-${page.id}-category-${Cat.id}`" :to="`/Page/${page.Path}/${Cat.Path}`" class="category"> {{Cat.Title}} </nuxt-link>
      </template>
    </template>
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

<style lang="scss" scoped>
.category {
  margin-left: 1rem;
}
</style>
