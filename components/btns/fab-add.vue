<template>
  <div id="fab-add" @click='open'>
    +
  </div>
</template>

<script>
export default {
  name: 'fab-add',
  props: {
    to: { type: [String, Object, Boolean], default: false }
  },
  methods: {
    open() {
      if (this.to) {
        this.$router.push(this.to)
      } else this.$emit("click")
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    border-radius: 2rem; 
    background-color: #f44336;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    width: 1rem;
    height: 1rem;
    padding: 1rem;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    transition: all .2s;
    box-shadow: 0rem 0rem .5rem white;
    &:hover {
      user-select: none;
      box-shadow: 0rem 0rem .3rem white;
    }
  }
</style>
