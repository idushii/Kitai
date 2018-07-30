<template>
  <select :value="idCategory" @input="e => $emit('input', e.target.value*1)">
    <option v-for="item in items" :key="`category-${item.id}`" :value="item.id">{{item.Title}}: {{item.Info}}</option>
  </select>
</template>

<script>
export default {
  name:'SelectCategory',
  props: {
    idCategory: { type: Number, default: null }
  },
  computed: {
    items() { return this.$store.getters.categoris }
  }
}
</script>

<style lang="scss" scoped>
  select {
    width: 100%; padding: .2rem;
  }
</style>
