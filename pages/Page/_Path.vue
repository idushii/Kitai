<template>
<div>
  <card title :clings="isAuth" :edit="isAuth" @edit=edit>{{Page.Title}}</card>
  <card> 
    <div slot="content" class="page-html" v-html="Page.Text" />
  </card>
</div>
</template>

<script>
export default {
  name: 'Page-Path',
  async asyncData({ app, params }) {
    return { Page: await app.$axios.$get(`/api/Page/${params.Path}`) }
  },
  methods: {
    edit() {
      this.$router.push(`/Edit/${this.Page.Path}`)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .card { margin-bottom: 1rem; }
</style>

<style>
  /*.page-html img { width: 100%; }*/
</style>

