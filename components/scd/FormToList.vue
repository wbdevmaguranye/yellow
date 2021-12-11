<template>
  <div class="container mx-auto">
    <FirestoreAsync :path="path" tableId="application">
      <template
        v-slot:default="{
          pending,
          errorMsg,
          data,
          getRecord,
          addRecord,
          deleteRecord,
          updateRecord,
          getFields
        }"
      >
        <FormulateForm
          class="grid grid-cols-6 gap-10"
          :schema="schema"
          v-model="FormData"
          @submit="addRecord(data)"
        />
      </template>
    </FirestoreAsync>
    <pre>{{ FormData }}</pre>
  </div>
</template>

<script>
import FirestoreAsync from "~/components/scd/FirestoreAsync";
export default {
  components: {
    FirestoreAsync
  },
  props: {
    schema: {
      type: Array,
      default: function() {
        return [];
      }
    },
    path: {
      type: String,
      required: true
    },
    tableId: {
      type: String,
      required: true
    },
    primaryKey: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      FormData: {}
    };
  }
};
</script>
