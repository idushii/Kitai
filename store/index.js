export const state = () => ({
  authUser: null,
  pages: [],
  categoris: [],
  TestList: [],
  Words: [],
  WordsCategoris: []
})

export const mutations = {
  SET_USER(state, user) { state.authUser = user },
  SET_MENU(state, pages) { state.pages = pages; },
  SET_CATEGORIS(state, categoris) { state.categoris = categoris; },
  SET_CATEGORY(state, Category) { 
    for (let indexCat in state.categoris) {
      if (state.categoris[indexCat].id == Category.id) return state.categoris[indexCat] = Category
    }
  },
  SET_RECORD(state, Record) {
    for (let indexCat in state.categoris) {
      for (let indexRecord in state.categoris[indexCat].Records) {
        if (state.categoris[indexCat].Records[indexRecord].id == Record.id) {
          return state.categoris[indexCat].Records[indexRecord] = Record
        }
      }
    }
  },
  SET_TEST_LIST(state, TestList) { state.TestList = TestList; },
  SET_TEST_ITEMS(state, {id, Items}) { 
    let index = state.TestList.reduce( (result, test, index) => test.id == id ? index : result, null );
    if (index !== null) state.TestList[index].Items = Items
    return Items
  },
  SET_TEST_INFO(state, Info) {
    console.log({commit: 'SET_TEST_INFO', payload: Info})
    let indexTest = state.TestList.reduce( (result, test, index) => test.id == Info.id ? index : result, null );
    if (indexTest !== null) { state.TestList[indexTest] = {...state.TestList[indexTest], ...Info}; }
  },
  SET_TEST_INFO_ITEM(state, Item) {
    console.log({commit: 'SET_TEST_INFO_ITEM', payload: Item})
    let indexTest = state.TestList.reduce( (result, test, index) => test.id == Item.idTest ? index : result, null );
    if (indexTest !== null) {
      let indexItem = state.TestList[indexTest].Items.reduce( (result, item, index) => item.id == Item.id ? index : result, null );
      if (indexItem !== null) {
        state.TestList[indexTest].Items[indexItem] = Item
      }
    }
  },
  SET_TEST(state, Test) {
    console.log({commit: 'SET_TEST', payload: Test})
    let index = state.TestList.reduce( (result, test, index) => test.id == Test.id ? index : result, null );
    if (index === null) { state.TestList.push(Test) } else { state.TestList[index] = Test }
    return Test
  },
  SET_WORDS(state, Items) { state.Words = Items },
  SET_WORDS_CATEGORIS(state, Items) { state.WordsCategoris = Items },
  SET_WORD(state, Word) {
    console.log({commit: 'SET_WORD', payload: Word})
    let index = state.Words.reduce( (result, word, index) => word.id == Word.id ? index : result, null );
    if (index !== null) { state.Words[index] = Word; return { result: true, Element: Word } }
    return { result: false, message: 'Невозможно обновить локальные данные слова'}
  }
}

export const getters = {
  USER: state => state.authUser,
  menu: state => state.pages.filter( page => page.ShowItem ),
  categoris: state => state.categoris,
  Category: state => Path => state.categoris.filter( Cat => Cat.Path == Path ).pop(),
  CategoryById: state => id => state.categoris.filter( Cat => Cat.id == id ).pop(),
  isLoadTestList: state => state.TestList.length,
  test: state => id => state.TestList.filter( test => test.id == id ).pop(),
  test_item: (state, getters) => (id, index) => {
    console.log({ getter: 'test_item', payload: {id, index} })
    if (getters.test(id)) {
      console.log({...getters.test(id)})
      if (getters.test(id).Items) return getters.test(id).Items[index]
      else return {}
    } else return null
  },
  TestLastID: state => state.TestList.reduce( (max, test) => test.id > max ? test.id : max , null ),
  Words: (state, getters) => state.Words.map( word => (
    {...word, tags: getters.WordsCategoris.filter( tag => word.Categoris.split(' ').map(id => id*1).indexOf(tag.id*1) != -1 )}
  ) ),
  WordsCategoris: state => state.WordsCategoris,
  WordsCategorisGyIDs: (state, getters) => ids => getters.WordsCategoris.filter( tag => ids.indexOf(tag.id*1) != -1 ),
  WordByTranslate: state => Translate => state.Words.filter( word => word.Translate == Translate ).pop(),
  Record: state => id => {
    for(let Cat of state.categoris) for(let Record of Cat.Records)
      if (Record.id == id) return {...Record, idCategory: Cat.id, idPage: Cat.idPage}
  },
  PageById: state => id => state.pages.filter( page => page.id == id ).pop()
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch }, { req, app }) {
    console.log({dispatch: 'nuxtServerInit'})
    if (req.session && req.session.authUser) { commit('SET_USER', req.session.authUser) }

    let data = await app.$axios.$get('api/pages'); commit('SET_MENU', data);
    data = await this.$axios.$get('/api/categoris/ListWithRecords'); commit('SET_CATEGORIS', data)
    data = await this.$axios.$get('/api/TestList'); commit('SET_TEST_LIST', data)
    data = await this.$axios.$get('/api/Words'); commit('SET_WORDS', data)
    data = await this.$axios.$get('/api/WordsCategoris'); commit('SET_WORDS_CATEGORIS', data)

    //dispatch('GET_MENU')
    //dispatch('GET_CATEGORIS')
    //dispatch('GET_TEST_LIST')
  },
  async login({ commit }, { username, password }) {
    try {
      const data = await this.$axios.$post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout({ commit }) {
    await this.$axios.$post('/api/logout')
    commit('SET_USER', null)
  },
  async SET_MENU({ commit }) {
    console.log({action: 'SET_MENU'})
    let data = await this.$axios.$post('/api/pages')
    return commit('SET_MENU', data)
  },
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
  async GET_MENU({ commit }) {
    console.log({action: 'GET_MENU'})
    let data = await this.$axios.$get('/api/pages')
    return commit('SET_MENU', data)
  },
  async GET_CATEGORIS({ commit }) {
    console.log({action: 'GET_CATEGORIS'})
    let data = await this.$axios.$get('/api/categoris'); return commit('SET_CATEGORIS', data)
  },
  async GET_TEST_LIST({ commit }) {
    console.log({action: 'GET_TEST_LIST'})
    let data = await this.$axios.$get('/api/TestList'); return commit('SET_TEST_LIST', data)
  },
  async GET_TEST_INFO({ getters, commit, dispatch }, id) {
    console.log({action: 'GET_TEST_INFO'})
    //if (!getters.isLoadTestList) await dispatch('GET_TEST_LIST')
    let data = await this.$axios.$get(`/api/Test/${id}/Items`);
    return commit('SET_TEST_ITEMS', {Items: data, id})
  },
  async SAVE_TEST_ITEM({commit}, Item) {
    let data = await this.$axios.$post(`api/Save/TestItem`, Item)
    if (data.result) commit('SET_TEST_INFO_ITEM', Item)
    return data.result ? true : data
  },
  async SAVE_TEST_INFO({commit}, Info) {
    let data = await this.$axios.$post(`api/Save/TestInfo`, Info)
    if (data.result) commit('SET_TEST_INFO', Info)
    return data.result ? true : data
  },
  async SAVE_TEST({commit}, Test) {
    let {data, status} = await this.$axios.post(`api/Save/Test`, Test)
    if (status == 200) {
      commit('SET_TEST', Test)
      return true
    } else 
      return data
  },
  async NEW_TEST({commit, dispatch}, Test) {
    let {data, status} = await this.$axios.post(`api/New/Test/`, Test)
    if (status == 200) { await dispatch('GET_TEST_LIST'); return true
    } else return data
  },
  async SET_RECORD({commit}, Record) {
    let {data, status} = await this.$axios.post(`/api/save/record/${Record.id}`, Record)
    if (status == 200) {
      commit('SET_RECORD', Record)
      return true
    } else 
      return data
  },
  async SET_CATEGORY({commit}, Category) {
    let {data, status} = await this.$axios.post(`/api/save/Category/${Category.id}`, Category)
    if (status == 200) {
      commit('SET_CATEGORY', Category)
      return true
    } else 
      return data
  },

  
  
}
