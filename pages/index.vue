<template>
  <div class="container">
    hello {{name}}
  </div>
</template>

<script>
let layout = 'site'
export default {
  name: 'index',
  layout: layout,
  asyncData() {
    return {
      name: process.static ? 'static' : (process.server ? 'server' : 'client')
    }
  },
}
</script>