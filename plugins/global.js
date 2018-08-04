import Vue from 'vue'
import card from '../components/card.vue'

import selectTree from '~/components/selectTree.vue'
import audioFile from '~/components/audio-file.vue'
import uploadSound from '~/components/upload-sound.vue'
import SelectCategory from '~/components/SelectCategory.vue'
import FabAdd from '~/components/btns/fab-add.vue'
import TestEditInfo from '~/components/Test/EditInfo.vue'
import EditItem from '~/components/Test/EditItem.vue'

Vue.component('card', card)
Vue.component('selectTree', selectTree)
Vue.component('audioFile', audioFile)
Vue.component('uploadSound', uploadSound)
Vue.component('SelectCategory', SelectCategory)
Vue.component('FabAdd', FabAdd)
Vue.component('TestEditInfo', TestEditInfo)
Vue.component('EditItem', EditItem)

Vue.mixin({
  computed: {
    isAuth() { 
      return !! this.$store.getters.USER 
    }
  }
})


