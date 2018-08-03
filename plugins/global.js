import Vue from 'vue'
import card from '../components/card.vue'

import selectTree from '~/components/selectTree.vue'
import audioFile from '~/components/audio-file.vue'
import uploadSound from '~/components/upload-sound.vue'
import SelectCategory from '~/components/SelectCategory.vue'

Vue.component('card', card)
Vue.component('selectTree', selectTree)
Vue.component('audioFile', audioFile)
Vue.component('uploadSound', uploadSound)
Vue.component('SelectCategory', SelectCategory)

Vue.mixin({
  computed: {
    isAuth() { 
      return true //!! this.$store.getters.USER 
    }
  }
})


