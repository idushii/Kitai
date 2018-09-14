<template>
  <div>
    <card title :back="`/Page/${PathPage}`" :edit=isAuth :edit-link="`/Edit/Category/${cat.id}`" clings>Категория "{{cat.Title}}"</card>
    <card> <div v-html="cat.Info" /> </card>
    <template v-for="Record in cat.Records">
      <card :key="`record-${Record.id}`" :next="`/Record/${Record.id}/${Record.Path}`">
        <div slot="title">{{Record.Title}}</div>
        <div slot="content" v-html="Record.Info" />
      </card>
    </template>
    <template v-for="Test in TestList">
      <card :key="`test-${Test.id}`" :next="`/Test/${Test.id}/Start`" next-text="Пройти" :edit="isAuth" :edit-link="`/Test/${Test.id}/Edit`">
        <div slot="title">{{Test.Title}}</div>
        <div slot="content" v-html="Test.Info" />
      </card>
    </template>
    <fab-add :to="`/Page/${PathPage}/${PathCategory}/Add`" />
  </div>
</template>

<script>
export default {
  name: 'Category',
  data: () => ({
    TestList: []
  }),
  computed: {
    PathPage() { return this.$route.params.PathPage },
    PathCategory() { return this.$route.params.PathCategory },
    cat() {
      return this.$store.getters['Category'](this.PathCategory)
    }
  },
  async mounted() {
    this.TestList = await this.$axios.$get(`/api/TestList/Category/${this.cat.id}`);
  }
}
</script>

<style>

</style>
