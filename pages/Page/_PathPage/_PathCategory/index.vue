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
    <fab-add :to="`/Page/${PathPage}/${PathCategory}/Add`" />
  </div>
</template>

<script>
export default {
  name: 'Category',

  computed: {
    PathPage() { return this.$route.params.PathPage },
    PathCategory() { return this.$route.params.PathCategory },
    cat() {
      return this.$store.getters['Category'](this.PathCategory)
    }
  }
}
</script>

<style>

</style>
