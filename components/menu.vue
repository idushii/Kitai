<template>
  <div id="main-menu" class="menu">
    <div class="title">Меню</div>
    <template v-for="page in items" >
      <nuxt-link :key="`page-${page.id}`" :to="`/Page/${page.Path}`"> {{page.Title}} </nuxt-link>
      <template v-if="page.Categoris">
        <nuxt-link 
          v-for="Cat in page.Categoris" 
          :key="`page-${page.id}-category-${Cat.id}`" 
          v-if="!Cat.isHide"
          :to="`/Page/${page.Path}/${Cat.Path}`" 
          class="category"
        > 
          {{Cat.Title}} 
        </nuxt-link>
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
  },
  computed: {
    items() {
      return this.$store.getters.menu
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  margin-left: 1rem;
}
</style>
