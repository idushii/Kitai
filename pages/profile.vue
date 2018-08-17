<template>
  <div class="profile">
    <card title clings> Профиль </card>
    <card>
      <form @submit.prevent="update">
        <p v-if="message.error" class="error">{{ message.error }}</p>
        <p v-if="message.success" class="success">{{ message.success }}</p>
        <label >Login: <input v-model="User.Login" type="text" name="Login" > </label> 
        <label >ФИО: <input v-model="User.FIO" type="text" name="FIO" > </label> 
        <label >E-mail: <input v-model="User.Email" type="text" name="Email" > </label> 
        <button type="submit">Обновить</button>
      </form>
    </card>
  </div>
</template>

<script>
export default {
  name: 'profile',
  layout: 'site',
  data: () => ({
    User: {
      id: '',
      Login: '',
      FIO: '',
      Email: ''
    },
    message: {
      success: '',
      error: ''
    }
  }),
  mounted() {
    this.User = {...this.$store.getters.USER}
  },
  methods: {
    async update() {
      try {
        await this.$store.dispatch('SET_PROFILE', this.User);
        this.message.success = 'Успешное обновление'
      } catch(err) { this.message.error = err.message }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  .card .content label {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding-bottom: .5rem;
  }

  .error { color: red; }
  .success { color: green; }
}
</style>
