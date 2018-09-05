<template>
  <div>
    <transition 
      v-for="word in ListWithUID" :key="`word-wrap-${word.uid}`"
      name="word"
      mode="out-in"
    >
      <router-link :to="`${ToWord}${word.Translate}`" :key="`word-${word.uid}`">
        <word :word="word" />
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ListCardsWords',
  props: {
    list: { type: Array, default: () => [] },
    ToWord: { type: String, default: '' },
  },
  computed: {
    ListWithUID() {
      return this.list.map( word => ({...word, uid: Math.random() }) )
    }
  }
}
</script>

<style lang="scss" scoped>
a { color: black; text-decoration: none; }
.word-enter         { transform: scale(.8); opacity: 0; }
.word-enter-to      { transform: scale(1); opacity: 1; }
.word-enter-active  { transition: all .2s; }

.word-leave         { transform: scale(1); opacity: 1; }
.word-leave-to      { transform: scale(.8); opacity: 0; }
.word-leave-active  { transition: all .2s; }
</style>
