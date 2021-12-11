<template>
  <div class="container">
    <select v-model="path">
      <option v-for="end in endpoints" :key="end.name" :value="end.path">{{
        end.name
      }}</option>
    </select>
    <AsyncRest :path="path" :id="userId" :fld="fld">
      <template
        v-slot:default="{
          getRecordList,
          records,
          error,
          hasError,
          next,
          prev,
          first,
          page
        }"
      >
        <div class="w-full">
          <h1 v-if="hasError" class="text-2xl">{{ error }}</h1>
          <button @click="getRecordList()">Refresh</button>
          <div class="w-full">
            <label for="path">Path</label>
            <input class="w-full" id="path" type="text" v-model="path" />
          </div>

          <label for="user">Search For</label>
          <input id="user" type="text" v-model="userId" />
          <label for="fld">Field</label>
          <input id="fld" type="text" v-model="fld" />
          <scd-list :records="records" field="title"></scd-list>
          <scd-table
            :records="records"
            :fields="['id', 'title', 'body']"
          ></scd-table>
          {{ page }}
          <button @click="first">First</button>
          <button @click="next">Next</button>
          <button @click="prev">Prev</button>
        </div>
      </template>
    </AsyncRest>
  </div>
</template>

<script>
import AsyncRest from "~/components/scd/AsyncRest";
export default {
  components: {
    AsyncRest
  },
  data() {
    return {
      userId: null,
      fld: null,
      path: "https://jsonplaceholder.typicode.com/posts",
      endpoints: [
        {
          name: "Posts",
          path: "https://jsonplaceholder.typicode.com/posts",
          fields: ["id", "title", "body"]
        },
        {
          name: "comments",
          path: "https://jsonplaceholder.typicode.com/comments",
          fields: ["id", "name", "email"]
        }
      ]
    };
  }
};
</script>

<style></style>
