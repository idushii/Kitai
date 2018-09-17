<template>
<div>
  <card title clings :edit="isAuth" edit-link="/Edit/Words">Личный cловарь</card>
  <card>
    <div slot="content">
      <div class="search">
        <input type="text" placeholder=" Поиск слова" @input="e => search.Text = e.target.value">
        <select v-model="search.Level">
          <option v-for="number in 6" :key="`level-${number}`" :value="number">{{number}} уровень</option>
        </select>
      </div>
    </div>
  </card>
  <list-cards-words class="words" :list=searchResult to-word="/Page/Words/" /> 
  <fab-add to="/Add/Words" />
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'PageListWords',
  computed: {
    ...mapGetters('Words', ['WordsByUser']),
    ...mapGetters('User', {idUser: 'id'}),
    Words() { return this.WordsByUser(this.idUser) },
    searchResult() {
      let result = this.Words;
      result = result.filter( word => word.Level <= this.search.Level )
      if (this.search.Text && isNaN(this.search.Text)) {
        let _result = []; let search = this.search.Text.toLowerCase();
        for( let word of result ) {
          //console.log(result.map( item => item.Pinyin ), word.Pinyin)
          if ( _result.map( item => item.Pinyin ).includes( word.Pinyin ) ) continue;

          let flag = false;
          for (let field of this.searchFields) 
            if (word[field].toLowerCase().indexOf(search) != -1) flag = true;
          if (flag) _result.push(word)
        }
        result = _result;
      }
      return result;
    }
  },
  mounted() {
    this.$store.dispatch('Words/GET_WORDS_BY_USER')
  },
  async asyncData({ app, params }) {
    return { 
      Page: await app.$axios.$get(`/api/Page/Words`), 
      searchFields: ['Pinyin', 'Translate', 'Hieroglyph']
    }
  },
  data: () => ({
    search: {
      Text: "",
      Level: 7,
      WordsCategoris: []
    }
  }),
  watch: {
    'search.Text'(to, from) {
      this.$store.dispatch('Words/SEARCH_WORD_BY_USER', to)
    }
  },
  methods: {
    openWord(Word) { this.$router.push(`/Page/Words/${Word.Translate}`) },
    clearString(str) { return str.replace(/\r?\n/g, "") },
    searchTag(tag) {
      let index = this.search.WordsCategoris.indexOf(tag.id)
      if (index == -1) 
        this.search.WordsCategoris.push(tag.id)
      else 
        this.search.WordsCategoris.splice(index, 1)
    },
    ...mapActions(['Words/SEARCH_WORD'])
  }
}
</script>

<style scoped lang=scss>
  .search {
    display: grid; grid-template-columns: 1fr auto; grid-gap: var(--gap);

    &>* { padding: calc(var(--gap) / 4); }

    input {width: 100%; }
    select { min-width: 100px; width: 5vw; }
  }

  .WordsCategoris {
    display: grid; grid-template-columns: repeat(7, 1fr); grid-gap: var(--gap);
    text-align: center;
    padding-top: var(--gap);
    

    div {
      border: 1px solid black;
      padding: calc( var(--gap) / 4 );
      cursor: pointer;
      transition: all .2s;

      &:hover { background-color: var(--select-background); }

      &.select { background-color: var(--select-background); }
    }
  }
  .words {
    margin-top: var(--gap);
  } 
</style>

