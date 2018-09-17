export const state = () => ({
  Words: [],
  WordsCategoris: [],
})

export const getters = {
  Words: (state, getters) => state.Words.map( word => (
    {...word, tags: getters.WordsCategoris.filter( tag => word.Categoris.split(' ').map(id => id*1).indexOf(tag.id*1) != -1 )}
  ) ),
  WordsByUser: (state, getter) => idUser => state.Words.filter( word => word.idUser == idUser ),
  WordsCategoris: state => state.WordsCategoris,
  WordsCategorisGyIDs: (state, getters) => ids => getters.WordsCategoris.filter( tag => ids.indexOf(tag.id*1) != -1 ),
  WordByTranslate: state => Translate => state.Words.filter( word => word.Translate == Translate ).pop(),

}

export const mutations = {
  SET_WORDS(state, Items) { state.Words = Items },
  SET_WORDS_CATEGORIS(state, Items) { state.WordsCategoris = Items },
  SET_WORD(state, Word) {
    console.log({commit: 'SET_WORD', payload: Word})
    let index = state.Words.reduce( (result, word, index) => word.id == Word.id ? index : result, null );
    if (index !== null) { state.Words[index] = Word; return { result: true, Element: Word } }
    return { result: false, message: 'Невозможно обновить локальные данные слова'}
  },
  APPEND_WORDS(state, Words = []) {
    for ( let Word of Words ) {
      if ( !state.Words.map( word => word.id ).includes( Word.id ) ) {
        state.Words.push(Word)
      }
    }
  },
}

export const actions = {
  async GET_WORDS({ commit }) {
    console.log({action: 'GET_WORDS'})
    let data = await this.$axios.$get('/api/Words')
    return commit('SET_WORDS', data)
  },
  async GET_WORDS_CATEGORIS({ commit }) {
    console.log({action: 'GET_WORDS_CATEGORIS'})
    let data = await this.$axios.$get('/api/WordsCategoris')
    return commit('SET_WORDS_CATEGORIS', data)
  },
  async SET_WORD({commit}, Word) {
    console.log({action: 'SET_WORD', payload: Word})
    let result = await this.$axios.$post(`/api/Words/${Word.id}`, Word)
    if (result.result) { commit('SET_WORD', Word); return { result: true } }
    else return result
  },
  async SEARCH_WORD({commit}, Text) {
    let {data, status} = await this.$axios.post(`/api/words/search/`, { Text })
    if (status == 200) {
      commit('APPEND_WORDS', data)
      return true
    } else 
      return data
  },
  async SEARCH_WORD_BY_USER({commit, rootGetters}, Text) {
    let {data, status} = await this.$axios.post(`/api/words/search-by-user/${rootGetters['User/id']}`, { Text })
    if (status == 200) {
      commit('APPEND_WORDS', data)
      return true
    } else 
      return data
  }
  
}