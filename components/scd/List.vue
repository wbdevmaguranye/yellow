<template>
  <div>
    <ul>
      <li v-for="(r, index) in records" :key="index">{{ r[field] }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      default: function() {
        return [];
      }
    },
    field: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
