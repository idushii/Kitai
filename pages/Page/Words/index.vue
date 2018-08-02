<template>
<div>
  <card title :edit="isAuth" edit-link="/Edit/Words">HSK cловарь</card>
  <card :html=Page.Text />
  <card>
    <div slot=title>Список</div>
    <div slot="content">
      <div class="search">
        <input type="text" placeholder=" Поиск слова" @input="e => search.Text = e.target.value">
        <select v-model="search.Level">
          <option v-for="number in 6" :key="`level-${number}`" :value="number">{{number}} уровень</option>
        </select>
      </div>
      <div class="WordsCategoris">
        <div 
          v-for="tag in WordsCategoris" :key="`tag-${tag.id}`" 
          :class="{select: search.WordsCategoris.indexOf(tag.Title) != -1}" 
          @click="searchTag(tag)"
        >{{tag.Title}}</div>
      </div>
      <table-words :list=searchResult />
    </div>
  </card>
</div>
</template>

<script>
import TableWords from '~/components/TableWords.vue'
import { mapGetters } from "vuex";
export default {
  name: 'PageListWords',
  layout: 'site',
  computed: {
    ...mapGetters(['Words', 'WordsCategoris']),
    searchResult() {
      let result = this.Words;
      result = result.filter( word => word.Level <= this.search.Level )
      if (this.search.Text && isNaN(this.search.Text)) {
        let _result = []; let search = this.search.Text.toLowerCase();
        for( let word of result ) {
          let flag = false;
          for (let field of this.searchFields) if (word[field].toLowerCase().indexOf(search) != -1) flag = true;
          if (flag) _result.push(word)
        }
        result = _result;
      }
      if (this.search.WordsCategoris.length) result = result.filter( word=> {
        let flag = true; for(let tag of this.search.WordsCategoris) if (word.WordsCategoris.indexOf(tag) == -1) flag = false; return flag;
      })
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
  components: {
    TableWords
  },
  methods: {
    openWord(word) {
      this.$router.push({name: 'Word', params: { translate: word.translate }})
    },
    clearString(str) {
      return str.replace(/\r?\n/g, "")
    },
    searchTag(tag) {
      let index = this.search.WordsCategoris.indexOf(tag)
      if (index == -1) 
        this.search.WordsCategoris.push(tag)
      else 
        this.search.WordsCategoris.splice(index, 1)
    }
  }
}
</script>

<style scoped lang=scss>
  section {
    box-shadow: var(--section-shadow);
    margin-bottom: var(--gap);

    &.selections {
      .title {
        font-size: 1.2rem;
        font-style: italic;
        text-align: center;
        margin: 0px; padding: var(--gap);
      }

      .search {
        display: grid; grid-template-columns: 1fr auto; grid-gap: var(--gap);
        margin: 0 var(--gap);

        &>* { padding: calc(var(--gap) / 4); }

        input {width: 100%; }
        select { min-width: 100px; width: 20vw; }
      }

      .WordsCategoris {
        display: grid; grid-template-columns: repeat(7, 1fr); grid-gap: var(--gap);
        text-align: center;
        padding: var(--gap);

        div {
          border: 1px solid black;
          padding: calc( var(--gap) / 4 );
          cursor: pointer;
          transition: all .2s;

          &:hover { background-color: var(--select-background); }

          &.select { background-color: var(--select-background); }
        }
      }
      
    }

    &.words {


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
          width: 300px;
        }
      }
    }

  }
</style>

<style>
.word-item {
  /*transition: all 10s;*/
}
.word-enter, .word-leave-to {
  opacity: 0;
  transform: scale(.8) translateX(10rem);
}


</style>
