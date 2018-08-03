<template>
  <div class="parents" :class="{isNotSelect}">
    <div class="parent" v-for="level1 in tree" :key="`item-${level1.id}`">
      <div @click="toggle(level1)">
        <img v-if="!isNotSelect" :src="ids_.indexOf(level1.id) != -1 ? '/checkOk.svg' : '/checkNo.svg'">
        <template v-if="isFull"><b>{{level1.Title}}</b> {{level1.Info}}</template> <template v-else><span :title="level1.Info" >{{level1.Title}}</span></template>
      </div>
      <div class="childrens">
        <div class="children" v-for="level2 in level1.childrens" :key="`item-${level2.id}`">
          <div @click="toggle(level2)">
            <img v-if="!isNotSelect" :src="ids_.indexOf(level2.id) != -1 ? '/checkOk.svg' : '/checkNo.svg'">
            <template v-if="isFull"><b>{{level2.Title}}</b> {{level2.Info}}</template> <template v-else><span :title="level2.Info" >{{level2.Title}}</span></template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'selectTree',
  props: {
    ids: { type: String, default: "" },
    items: { type: Array, default: () => [] },
    isNotSelect: { type: Boolean, default: false },
    isFull: { type: Boolean, default: true }
  },
  computed: {
    tree() {
      // Не больше двойной вложенности
      let result = [];
      for (let item of this.items) {
        if (item.idParent === undefined || item.idParent === null) result.push({...item, childrens: []})
      }

      for (let itemParent of result) {
        for (let item of this.items) {
          if (item.idParent == itemParent.id) itemParent.childrens.push({...item, idParent: itemParent.id})
        }
      }

      return result;
    },
  },
  data: () => ({
    ids_: []
  }),
  created() {
    this.ids_ = this.ids.split(' ').map(id => id*1)
  },
  methods: {
    toggle(item) {
      let index = this.ids_.indexOf(item.id)
      if (index == -1) { 
        this.ids_.push(item.id); 
        if (item.idParent !== null && this.ids_.indexOf(item.idParent) == -1) this.ids_.push(item.idParent); 
      } else {
        this.ids_.splice( index, 1 )
        for (let itemChildren of item.childrens) {
          let indexChild = this.ids_.indexOf(itemChildren.id)
          if (indexChild != -1) this.ids_.splice( indexChild, 1 )
        }
      }
      this.$emit('input', this.ids_.join(' '))
    }
  }
}
</script>

<style lang="scss" scoped>
  select {
    width: 100%; padding: .2rem;
  }

  .parent {
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .childrens {
    margin-left: 1rem;

    .children {
      margin-top: .5rem;
    }
  }

  .isNotSelect {
    * { cursor: default; }
  }

  img { width: 1rem; position: relative; top: 2px; }
</style>
