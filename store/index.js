export const state = () => ({
  pages: [],
  categoris: [],
  TestList: [],
  CurrentTest: {},
  ListVoice: [],
  config: {
    host: 'http://localhost:8080/',
    app_id: 6047893
  }
})

import User from './User'
import Words from './Words'

export const modules = {
  User, Words
}

export const mutations = {
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
  NEW_RECORD(state, Record) {
    let index = state.categoris.reduce( (result, cat, index) => cat.id == Record.idCategory ? index : result, null );
    return state.categoris[index].Records.push(Record);
  },
  REMOVE_RECORD(state, Record) {
    let index = state.categoris.reduce( (result, cat, index) => cat.id == Record.idCategory ? index : result, null );
    let indexRecord = state.categoris[index].Records.reduce( (result, record, index) => record.id == Record.id ? index : result, null );
    return state.categoris[index].Records.splice(indexRecord, 1);
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
  ADD_CURRENT_TEST_ITEM(state, {idTest, idItem, Answer}) {
    console.log({commit: 'ADD_CURRENT_TEST_ITEM', payload: {idTest, idItem, Answer}})
    if ( !state.CurrentTest.idTest ) state.CurrentTest.idTest = idTest
    if ( !state.CurrentTest.Answers ) state.CurrentTest.Answers = {}
    state.CurrentTest.Answers[idItem]  = Answer
    localStorage.CurrentTest = JSON.stringify( state.CurrentTest )
  },
  SET_CURRENT_TEST(state, CurrentTest) {
    console.log({commit: 'SET_CURRENT_TEST', payload: CurrentTest})
    state.CurrentTest = CurrentTest
  },
  CLEAR_CURRENT_TEST(state) {
    state.CurrentTest = { idTest: null, Answers: {} }
    localStorage.removeItem('CurrentTest')
  },
  SET_VOICES(state, ListVoice) { 
    state.ListVoice = ListVoice; 
  }
}

export const getters = {
  menu: state => state.pages.filter( page => page.ShowItem ),
  categoris: state => state.categoris,
  Category: (state, getter) => Path => ({ ...state.categoris.find( Cat => Cat.Path == Path ) }),
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
  CurrentTest: state => state.CurrentTest,
  CurrentTestResult: (state, getters) => {
    let result = {}
    let Test = getters.test(state.CurrentTest.idTest)
    console.log( 'current', getters.test(state.CurrentTest.idTest) )
    if ( !Test || !Test.Items ) return {}
    for (let Item of Test.Items) { result[Item.id]= (state.CurrentTest.Answers[Item.id] * 1 == Item.NumberTrue * 1); }
    return { count: Object.values(result).length, isTrue: Object.values(result).reduce( (result, item) => item == true ? result + 1 : result, 0 ) }
  },
  Record: state => id => {
    for(let Cat of state.categoris) for(let Record of Cat.Records)
      if (Record.id == id) return {...Record, idCategory: Cat.id, idPage: Cat.idPage}
  },
  PageById: state => id => state.pages.filter( page => page.id == id ).pop(),
  ListVoice: state => state.ListVoice,
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch, state }, { req, app }) {
    console.log({dispatch: 'nuxtServerInit'})

    state.config.host = app.context.env.host;

    if (req.session && req.session.authUser) { commit('SET_USER', req.session.authUser) }

    let data = await app.$axios.$get('api/pages'); commit('SET_MENU', data);
    data = await this.$axios.$get('/api/categoris/ListWithRecords'); commit('SET_CATEGORIS', data)
    data = await this.$axios.$get('/api/TestList'); commit('SET_TEST_LIST', data)
    data = await this.$axios.$get('/api/Words'); commit('Words/SET_WORDS', data)
    data = await this.$axios.$get('/api/WordsCategoris'); commit('Words/SET_WORDS_CATEGORIS', data)

    //dispatch('GET_MENU')
    //dispatch('GET_CATEGORIS')
    //dispatch('GET_TEST_LIST')
  },
  async SET_MENU({ commit }) {
    console.log({action: 'SET_MENU'})
    let data = await this.$axios.$post('/api/pages')
    return commit('SET_MENU', data)
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
  async NEW_RECORD({commit}, Record) {
    let {data, status} = await this.$axios.post(`/api/save/record/`, Record)
    if (status == 200) {
      console.log({...data})
      commit('NEW_RECORD', {...Record, id: data.id})
      return true
    } else 
      return data
  },
  async REMOVE_RECORD({commit}, Record) {
    let {data, status} = await this.$axios.post(`/api/remove/record/${Record.id}`)
    if (status == 200) {
      console.log({...data})
      commit('REMOVE_RECORD', Record)
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
