<template>
  <table>
    <thead>
        <tr>
            <th>Уровень</th>
            <th>Пиньинь</th>
            <th>Иероглиф</th>
            <th>Перевод</th>
            <th>Описание</th>
            <th>Звучание</th>
        </tr>
    </thead>
      <transition-group name="word" tag="tbody">
        <tr v-for="word in list" :key="`word-${word.Level}-${word.Pinyin}`" :key1="`word-${word.Level}-${word.Pinyin}`" @click="open(word)">
          <td>L{{word.Level}}</td>
          <td>{{word.Pinyin}}</td>
          <td class="word">{{word.Hieroglyph}}</td>
          <td>{{word.Translate}}</td>
          <td>{{word.Sample}}</td>
          <td class="audio">
            <audio-file v-if="word.Sound" ref="audio" :src="word.Sound" width="20" center />
            <no-ssr v-else>
              <voice :text="word.Hieroglyph" voice="zh-CN" @click.native=empty />
            </no-ssr>
          </td>
        </tr>
      </transition-group>
  </table>
</template>

<script>
export default {
  name: 'TableWords',
  props: {
    list: { type: Array, default: () => [] },
    open: { type: Function, default: () => {} }
  },
  methods: {
    empty() {}
  },
}
</script>

<style lang="scss" scoped>
  table {
    width: 100%;

    th {
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      padding: calc(var(--gap) / 2);
    }

    td { text-align: center; }
    tr { cursor: pointer; transition: all .2s; }
    tbody tr:hover { background-color: var(--select-background); }

    .word {
      font-size: 2rem;
    }

    .audio {
    }
  }

</style>

<style>
.word-item {
  /*transition: all 10s;*/
}
.word-enter, .word-leave-to {
  opacity: 0;
  transform: scale(.9);
}
</style>
