<template>
  <table>
    <thead>
        <tr>
            <th>#</th>
            <th>Пиньинь</th>
            <th>Иероглиф</th>
            <th>Перевод</th>
            <th>Уровень</th>
            <th>Категории</th>
            <th>Звучание</th>
        </tr>
    </thead>
      <transition-group name="word" tag="tbody">
        <tr v-for="(word, index) in list" :key="`word-${word.Pinyin}`" :key1="`word-${word.Pinyin}`" @click="Open(word)">
          <td>{{index+1}}</td>
          <td>{{word.Pinyin}}</td>
          <td class="word">{{word.Hieroglyph}}</td>
          <td>{{word.Translate}}</td>
          <td>{{word.Level}}</td>
          <td>{{word.tags.map(tag => tag.Title).join(', ')}}</td>
          <td class="audio"><audio-file :src="word.link" /></td>
        </tr>
      </transition-group>
  </table>
</template>

<script>
import audioFile from '~/components/audio-file.vue'

export default {
  name: 'TableWords',
  props: {
    list: { type: Array, default: () => [] },
    Open: { type: Function, default: () => {} }
  },
  components: {
    audioFile,
  }

}
</script>
