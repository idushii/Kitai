<template>
  <div>
    <card title :clings=isAuth :edit="isAuth" @edit="$router.push('/Edit/Testing')"> {{Page.Title}} </card>
    <card><div slot="content" v-html="Page.Text" /></card>
    <card v-for="Test in TestList" :key="`test-${Test.id}`" :next="`/Test/${Test.id}/Start`" next-text="Пройти" :edit="isAuth" :edit-link="`/Test/${Test.id}/Edit`">
      <div slot="title">{{Test.Title}}</div>
      <div slot="content" v-html="Test.Info" />
      <div slot="append">Добавлен №№ №№ №№№№</div>
    </card>
    <fab-add v-if="isAuth" @click="addNewTest" />
  </div>
</template>

<script>
export default {
  name: 'Test',
  layout: 'site',
  async asyncData({ app, params }) {
    return { 
      Page: await app.$axios.$get(`/api/Page/Testing`), 
      TestList: await app.$axios.$get(`/api/TestList`), 
    }
  },
  methods: {
    addNewTest() {
      this.$router.push('Test/New')
    }
  }
}
</script>

<style lang="scss" scoped>
  a { 
    color:  black;
    text-decoration: none;
  }
</style>
