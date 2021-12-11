<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">testingAndy</h1>
      <input type="number" v-model="setTovalue">
      <button @click="setCounter(setTovalue)">Set</button>
    </div>
    {{counter}}
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState('counterStore',['counter'])
  },
  methods: {
    ...mapActions('counterStore',['setCounter'])
  },
  data() {
    return {
      setTovalue: 0
    }
  },
};
</script>

<style>

