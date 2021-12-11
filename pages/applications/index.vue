<template>
  <div class="mx-auto">
    <h1 class="mb-10 hmain">Applications</h1>
    <FirestoreAsync
      class="ml-0 md:ml-auto"
      id="applications"
      :path="`Applications/${this.authUser.id}/Apply`"
      tableId="Applications"
      :shouldSync="shouldSync"
      :sorting="sortingCriteria"
    >
      <template
        v-slot:default="{
          pending,
          errorMsg,
          data,
          pageNumber,
          next,
          prev,
          first,
          getRecordList,
          addRecord,
          deleteRecord,
          getFields
        }"
      >
        <div class="container mx-auto">
          <h1 v-if="pending">Getting records</h1>
          <h1 v-if="errorMsg">{{ errorMsg }}</h1>

          <table class="table-auto">
            <tr class="border-gray-800">
              <th v-for="(fld, hindex) in showfields" :key="hindex">
                {{ fld.label }}
              </th>
            </tr>
            <tr v-for="r in data" :key="r.id">
              <td v-for="(fld, hindex) in showfields" :key="hindex">
                <div v-if="fld.field == 'key'">
                  <nuxt-link :to="`/apply/${r['key']}`">
                    {{ r[fld.field] }}
                  </nuxt-link>
                </div>
                <div v-else-if="fld.field == 'createdAt'">
                  {{ r[fld.field].toDate() }}
                </div>
                <div v-else>
                  {{ r[fld.field] }}
                </div>
              </td>
              <td><button @click="viewDetails(r)">View Details</button></td>
            </tr>
          </table>

          <button @click="getRecordList">Refresh</button>
        </div>
      </template>
    </FirestoreAsync>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FirestoreAsync from "~/components/scd/FirestoreAsync.js";
export default {
  components: {
    FirestoreAsync
  },
  computed: {
    ...mapState(["authUser"])
  },
  middleware: "authenticated",
  data() {
    return {
      shouldSync: false,
      applications: [],
      sortingCriteria: [{ key: "createdAt", ascending: true }],
      showfields: [
        {
          field: "key",
          label: "Application Id"
        },
        {
          field: "first_name",
          label: "First Name"
        },
        {
          field: "last_name",
          label: "Last Name"
        },
        {
          field: "createdAt",
          label: "Date"
        }
      ]
    };
  },
  methods: {
    ...mapActions("applicationStore", ["getApplication"]),
    async viewDetails(record) {
      let r = { record: record, authUser: this.authUser };
      await this.getApplication(r);
      if (!this.getApplication(r)) {
        return null;
      } else {
        this.$router.push({
          name: "apply",
          params: { id: `${r.record.key}` }
        });
      }
      // this.$router.push(`apply/${record.key}`);

      // console.log(record);
    }

    // async getBankingDetails(record) {
    //   await this.$fire.firestoreReady();

    // }
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
