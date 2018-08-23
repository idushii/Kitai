<template>
  <div>
    <card title :back="`/Page/${Page.Path}/${Category.Path}`" :edit="isAuth" :edit-link="`/Record/${id}/Edit`">{{Record.Title}}</card>
    <card>
      <div id="content-record" v-html="Record.Text" />
    </card>
  </div>
</template>

<script>
export default {
  name: 'Record',

  computed: {
    id() { return this.$route.params.id },
    Record() {
      return this.$store.getters['Record'](this.id)
    },
    Page() {
      return this.$store.getters['PageById'](this.Record.idPage)
    },
    Category() {
      return this.$store.getters['CategoryById'](this.Record.idCategory)
    }
  }
}
</script>
