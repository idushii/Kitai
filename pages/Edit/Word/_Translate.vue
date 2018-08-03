<template>
  <div class="EditWord">
    <card class="title" title :back="`/Page/Words/${Word.Translate}`" :save=save>Изменить слово "{{Word.Translate}}"</card>
    <card class="info">
      <div slot="title">Информация</div>
      <div slot="content" id="content-edit-word">
        <label>Уровень</label><input type="text"  v-model="Word.Level">
        <label>Пиньин</label><input type="text" v-model="Word.Pinyin">
        <label>Иероглиф</label><input type="text"  v-model="Word.Hieroglyph">
        <label>Перевод</label><input type="text"  v-model="Word.Translate">
      </div>
    </card>
    <card class="tags">
      <div slot="title">Категория</div>
      <div slot="content">
        <select-tree id="select-tree" :items=tags :ids="Word.Categoris" @input="ids => Word.Categoris = ids"/>
      </div>
    </card>
    <card class="sound">
      <div slot="title">Озвучивание</div>
      <div slot="content" id="content-edit-sound">
        <audio-file :scr="Word.sound" />
        <div></div>
        <upload-sound v-model="Word.Sound" :name="Word.id" />
      </div>
    </card>
    <card>
      <div slot="title">Примечание</div>
      <div slot="content">
        <p>Я планирую сделать возможным запись звука прямо на сайте. Еще думаю надо озвучкой через бота, но это сложно и в триал версии есть свои ограничения.</p>
        <p>И, кстати, было бы полезно сделать поле примечание, наверное. Точно не хуже.</p>
      </div>
    </card>
  </div>
</template>

<script>

export default {
  name: 'Edit-Word',
  layout: 'document',
  computed: {
    tags() { return this.$store.getters.WordsCategoris },
  },
  asyncData({store, params}) {
    return {
      Word: {...store.getters.WordByTranslate(params.Translate)},
    }
  },
  methods: {
    async save() {
      let result = await this.$store.dispatch('SET_WORD', this.Word)
      console.log(result)
      if (result.result) {
        this.$router.push(`/Page/Words/${this.Word.Translate}`)
      } else {
        alert(result.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.EditWord {
  display: grid; grid-gap: var(--gap); 
  grid-template-areas: "title title" "tags info" "tags sound";
  grid-template-columns: 1fr 3fr;

  .title { grid-area: title; }
  .info { grid-area: info; }
  .tags { grid-area: tags; }
  .sound { grid-area: sound; }
}

#content-edit-word {
  display: grid; grid-template-columns: 1fr 2fr; grid-gap: var(--gap);
  label { text-align: right; }
  input { padding: calc(var(--gap) / 4); position: relative; top: -3px; }
}
#content-edit-sound {
  display: grid; grid-template-columns: auto 1fr auto;
}

#select-tree {
  margin-left: 1rem;
}
</style>

