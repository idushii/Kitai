export default {
  namespaced: true,
  state: () => ({
    Login: '',
    Email: '',
    id: '',
    FIO: '',
    isSendCode: false
  }),
  getters: {
    USER: state => ({Login: state.Login, FIO: state.FIO, Email: state.Email, id: state.id}),
    isAuth: state => state.id !== null ? true: false,
  },
  mutations: {
    SET_USER(state, User) { 
      let Login = '', Email = '', id = null, FIO = ''
      if (User) ({Login, Email, id, FIO} = User);
      console.log(User)
      state.id = id;
      state.Email = Email;
      state.Login = Login;
      state.FIO = FIO;
    },
    ChangeIsSetCode(state, flag) {
      state.isSendCode = flag
    }
  },
  actions: {
    async Login({ commit }, { Login, Pass }) {
      try {
        const result = await this.$axios.$post('/api/login', { username: Login, password: Pass })
        console.log(result)
        commit('SET_USER', result)
        if (localStorage) localStorage.user = JSON.stringify(result);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
    async SendCodeVK({ state, commit }, code) {
      if (state.isSendCode === false) {
        let result = await this.$axios.$post(`api/login/vk`, { code: code })
        if (result.status == "ok") {
          console.log({result}) 
          commit('ChangeIsSetCode', true)
          commit('SET_USER', result.user)
          if (localStorage) localStorage.user = JSON.stringify(result.user);
          return true;
        } else {
          return false;
        }
      }
    },
    async LogOut({ commit }) {
      await this.$axios.$post('/api/logout')
      commit('SET_USER')
      if (localStorage) localStorage.removeItem("user")
      commit('ChangeIsSetCode', false)
    },
    async Reg({commit}, {Login, Pass}) {
      commit('SET_USER', {Login, Pass})
      return true;
    },
    async Reg2({commit, getters, dispatch}, {FIO, Email}) {
      try {
        let data = await this.$axios.$post('/api/users/reg', {...getters.USER, FIO, Email})
        commit('SET_USER', {...getters.USER, id: data.id})
      } catch(error) { throw new Error(error.response.data.message) }
    },
    async SET_PROFILE({commit, getter}, User) {
      try {
        let data = await this.$axios.$post('/api/users/profile', User)
        commit('SET_USER', User)
      } catch(error) { throw new Error(error.response.data.message) }
    },
  
  },
}