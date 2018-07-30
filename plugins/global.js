import Vue from 'vue'
import card from '../components/card.vue'

Vue.component('card', card)

Vue.mixin({
  computed: {
    isAuth() { 
      return true //!! this.$store.getters.USER 
    }
  }
})


