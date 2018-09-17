<template>
  <div class="AddWord">
    <card class="title" title :back="`/Page/Words-Private`" :save=add>Добавить новое слово</card>
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
        <audio-file :src="Word.Sound" />
        <div></div>
        <upload-sound v-model="Word.Sound" :name="Word.id" />
      </div>
    </card>
  </div>
</template>

<script>

export default {
  name: 'Edit-Word',
  layout: 'document',
  computed: {
    tags() { return this.$store.getters['Words/WordsCategoris'] },
  },
  asyncData({store, params}) {
    return {
      Word: {
        Level: 1,
        Pinyin: '',
        Hieroglyph: '',
        Translate: '',
      },
    }
  },
  methods: {
    async add() {
      let result = await this.$store.dispatch('Words/ADD_WORD', this.Word)
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
.AddWord {
  display: grid; grid-gap: var(--gap); 
  grid-template-areas: "title title" "info info" "sound sound" ". .";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto 1fr;

  .title { grid-area: title; }
  .info { grid-area: info; }
  .tags { grid-area: tags; display: none; }
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

