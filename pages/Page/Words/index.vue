<template>
<div>
  <card title clings :edit="isAuth" edit-link="/Edit/Words">HSK cловарь</card>
  <card>
    <div slot="content">
      <div class="search">
        <input type="text" placeholder=" Поиск слова" @input="e => search.Text = e.target.value">
        <select v-model="search.Level">
          <option v-for="number in 6" :key="`level-${number}`" :value="number">{{number}} уровень</option>
        </select>
      </div>
      <!--div class="WordsCategoris">
        <div 
          v-for="tag in WordsCategoris" :key="`tag-${tag.id}`" 
          :class="{select: search.WordsCategoris.indexOf(tag.Title) != -1}" 
          @click="searchTag(tag)"
        >{{tag.Title}}</div>
      </div-->
      <table-words v-if="$root.layoutName == 'site'" class="words" :list=searchResult :open=openWord />
    </div>
  </card>
  <list-cards-words v-if="$root.layoutName != 'site'" class="words" :list=searchResult to-word="/Page/Words/" /> 
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'PageListWords',
  computed: {
    ...mapGetters(['Words', 'WordsCategoris']),
    searchResult() {
      let result = this.Words;
      result = result.filter( word => word.Level <= this.search.Level )
      if (this.search.Text && isNaN(this.search.Text)) {
        let _result = []; let search = this.search.Text.toLowerCase();
        for( let word of result ) {
          if ( word.Level != 6 ) continue;
          let flag = false;
          for (let field of this.searchFields) 
            if (word[field].toLowerCase().indexOf(search) != -1) flag = true;
          if (flag) _result.push(word)
        }
        result = _result;
      }
      /*if (this.search.WordsCategoris.length) {
        let _result = [];
        for(let word of result){
          let flag = false;
          for(let tag of this.search.WordsCategoris) if (word.Categoris.split(" ").map(id => id*1).indexOf(tag) != -1) flag = true;
          if (flag) _result.push(word)
        }

        result = _result;
      }//*/
      return result;
    }
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
      this.$store.dispatch('SEARCH_WORD', to)
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
    ...mapActions(['SEARCH_WORD'])
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

