<template>
  <div>
    <edit-item title="Изменить вопрос теста" close :id=id :index=index @save=save />
  </div>
</template>

<script>
import EditItem from '~/components/Test/EditItem.vue'
export default {
  name: "Test-id-Page-index-Edit",
  layout: 'document',
  computed: {
    id() { return this.$route.params.id*1 },
    index() { return this.$route.params.index*1 },
  },
  methods: {
    async save(Item) {
      console.log({Item})
      let result = await this.$store.dispatch('SAVE_TEST_ITEM', Item)
      if (result === true) {
        this.$router.push(`/Test/${this.id}/Page/${this.index}`)
      } else alert(result.message)
    }
  },
  components: {
    EditItem
  }
}
</script>
