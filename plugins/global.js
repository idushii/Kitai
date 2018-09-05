import Vue from 'vue'
import card from '../components/card.vue'

import selectTree from '~/components/selectTree.vue'
import audioFile from '~/components/audio-file.vue'
import uploadSound from '~/components/upload-sound.vue'
import SelectCategory from '~/components/SelectCategory.vue'
import FabAdd from '~/components/btns/fab-add.vue'
import TestEditInfo from '~/components/Test/EditInfo.vue'
import EditItem from '~/components/Test/EditItem.vue'
import TableWords from '~/components/TableWords.vue'
import Word from '~/components/Word.vue'
import ListCardsWords from '~/components/ListCardsWords.vue'

Vue.component('card', card)
Vue.component('selectTree', selectTree)
Vue.component('audioFile', audioFile)
Vue.component('uploadSound', uploadSound)
Vue.component('SelectCategory', SelectCategory)
Vue.component('FabAdd', FabAdd)
Vue.component('TestEditInfo', TestEditInfo)
Vue.component('EditItem', EditItem)
Vue.component('Word', Word)
Vue.component('TableWords', TableWords)
Vue.component('ListCardsWords', ListCardsWords)

Vue.mixin({
  computed: {
    isAuth() { 
      return this.$store.getters.USER.id ? true : false
    }
  },
  data: () => ({
    layout_site: 'site'
  }),
})
