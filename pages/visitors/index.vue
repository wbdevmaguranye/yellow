<template>
  <div class="mx-auto">
    <h1 class="mt-6 mb-10 hmain">list of visitors</h1>
    <FirestoreAsync
      class="ml-0 md:ml-auto"
      id="applications"
      :path="`Applications/`"
      tableId="Applications"
      :shouldSync="shouldSync"
      :sorting="sortingCriteria"
    >
      <template
        v-slot:default="{
          pending,
          errorMsg,
          data
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
                  {{ r[fld.field] }}
                </div>
                <div v-else>
                  {{ r[fld.field] }}
                </div>
              </td>
            </tr>
          </table>
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

  data() {
    return {
      shouldSync: false,
      applications: [],
      sortingCriteria: [{ key: "createdAt", ascending: true }],
      showfields: [
        {
          field: "first_name",
          label: "Name"
        },
        {
          field: "last_name",
          label: "Surname"
        },
        {
          field: "phone_number",
          label: "Phone"
        },
        {
          field: "reason",
          label: "Reason for visit"
        },

        {
          field: "fever",
          label: "Temperature"
        },
        {
          field: "cough",
          label: "Cough"
        },
        {
          field: "shortness_of_breath",
          label: "Difficulty breathing"
        },
        {
          field: "sore_throat",
          label: "Sore throat"
        },
        {
          field: "loss_of_smell",
          label: "loss of smell/taste"
        },
        {
          field: "chills",
          label: "Chills"
        },
        {
          field: "muscle_aches",
          label: "Head/muscle aches"
        },
        {
          field: "vomiting",
          label: "Nausea,diarrhoea"
        },

        {
          field: "contact",
          label: "contact with anyone with sysmptoms"
        },
        {
          field: "tested",
          label: "Contact with anyone who tested positive"
        },
        {
          field: "waiting_results",
          label: "Tested waiting results"
        },
        {
          field: "do_you_have_covid",
          label: "Tested for Covid-19"
        },
        {
          field: "have_you_travelled",
          label: "Travelled outside of the country?"
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
    async readFromFirestore() {
      let r = { record: record };
      const db = await this.$fire.firestoreReady();
      db.collection("Applications")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            console.log(doc.data().first_name);
            this.FormData = doc.data;
          });
        });
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

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
