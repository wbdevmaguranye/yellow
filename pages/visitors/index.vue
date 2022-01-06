<template>
  <div>
    <div class="ml-8">
      <h1
        class="mt-4 mb-0 tracking-tight text-justify text-gray-700 mtext-sm sm:text-2xl"
      >
        List of visitors.
        <button
          @click="printDiv()"
          class="flex justify-center px-8 py-3 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm mt-14 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          PrintData
        </button>
      </h1>
    </div>

    <div id="hameno" class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="border-b">
                <tr v-if="getCovidRecordInfo">
                  <th
                    scope="col"
                    class="px-2 py-4 text-sm font-medium text-left text-gray-900"
                    v-for="(fld, hindex) in showfields"
                    :key="hindex"
                  >
                    {{ fld.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b" v-for="r in record1" :key="r.id">
                  <td
                    class="px-2 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                    v-for="(recc, hindex) in showfields"
                    :key="hindex"
                  >
                    <div v-if="recc.field == 'key'">
                      {{ r[recc.field] }}
                    </div>

                    <div v-else>
                      {{ r[recc.field] }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FirestoreAsync from "~/components/scd/FirestoreAsync.js";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: {
    appId: {
      type: String,
      default: null
    }
  },
  middleware: "authenticated",
  computed: {
    // ...mapState("storagefs", ["files", "progress"]),
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters("applicationStore", ["getCovidRecordInfo"]),
    ...mapGetters("applicationStore", ["userCountry"]),

    ...mapState(["authUser"]),

    ...mapState(["authUser", "isLoading"]),
    ...mapState("error", ["error"]),

    ...mapState("applicationStore", ["record"]),
    ...mapState("applicationStore", ["userCountry"])
  },
  components: {},

  data() {
    return {
      showfields: [
        {
          field: "key",
          label: ""
        },
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
          field: "country",
          label: "Country"
        },
        {
          field: "reason",
          label: "Visit?"
        },
        {
          field: "fever",
          label: "Temp(°C)"
        },
        {
          field: "vomiting",
          label: "Nausea,diarrhoea?"
        },
        {
          field: "cough",
          label: "Cough?"
        },
        {
          field: "shortness_of_breath",
          label: "Normal breath?"
        },
        {
          field: "sore_throat",
          label: "Sore throat?"
        },
        {
          field: "loss_of_smell",
          label: "loss of smell/taste?"
        },
        {
          field: "chills",
          label: "Feeling cold?"
        },
        {
          field: "muscle_aches",
          label: "Head/muscle aches?"
        },
        {
          field: "have_you_travelled",
          label: "Travelled abroad?"
        },
        {
          field: "waiting_results",
          label: "Waiting results?"
        },
        {
          field: "do_you_have_covid",
          label: "Tested Covid?"
        },
        {
          field: "contact",
          label: "Sysmptoms contact?"
        },
        {
          field: "tested",
          label: "Tested positive contact?"
        }

        // {
        //   field: "createdAt",
        //   label: "Visit DATE"
        // }
      ],
      record1: []
    };
  },
  methods: {
    ...mapActions("applicationStore", ["setCovidRecordAction"]),
    ...mapActions("applicationStore", ["setUserCountryAction"]),
    ...mapActions("applicationStore", ["resetCountry"]),
    async readFromFirestore() {
      const db = await this.$fire.firestoreReady();
      await db
        .collection("Applications")
        .where("country", "==", `${this.userCountry.countries}`)
        .get()
        .then(snapshot => {
          this.setCovidRecordAction(null);
          snapshot.docs.forEach(doc => {
            // console.log(doc.data().first_name);

            const record = JSON.parse(JSON.stringify(doc.data()));
            this.setCovidRecordAction(record);
            //
          });
        });
    },
    async getCountries() {
      const db = await this.$fire.firestoreReady();

      const snapData = await db
        .collection("ApplicationUsers")
        .doc(`${this.authUser.id}`)
        .get()
        .then(docRef => {
          ///this.userCountry = docRef.data().countries;
          this.setUserCountryAction(docRef.data());
        });
    },
    printDiv() {
      var printContents = document.getElementById("hameno").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  },
  watch: {
    data(authUser) {
      this.authUser = authUser;
    }
  },
  async mounted() {
    await this.getCountries();

    if (this.userCountry) {
      await this.readFromFirestore();
      //this.record1[0] = this.record[1];

      for (let i of this.record) i && this.record1.push(i);
    }

    //

    // console.log(this.userCountry);
  }
  // getData() {}
};
</script>

<style scoped></style>
