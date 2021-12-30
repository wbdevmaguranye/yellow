<template>
  <div>
    <h1 class="mt-6 mb-10 hmain">list of visitors</h1>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="border-b">
                <tr v-if="getCovidRecordInfo">
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-medium text-left text-gray-900"
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
                    class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
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

            //console.log(record);
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

<style scoped>
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
body {
  font-family: Helvetica;
  -webkit-font-smoothing: antialiased;
  background: rgba(71, 147, 227, 1);
}
h2 {
  text-align: left;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
  padding: 30px 0;
}

/* Table Styles */

.table-wrapper {
  margin: 100px;
  box-shadow: 0px 35px 100px rgba(0, 0, 0, 0.2);
}

.fl-table {
  border-radius: 15px;
  font-size: 12px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: prewrap;
  background-color: white;
}

.fl-table td,
.fl-table th {
  text-align: center;
  padding: 8px;
}

.fl-table td {
  border-right: 1px solid #f8f8f8;
  font-size: 12px;
}

.fl-table thead th {
  color: #ffffff;
  background: #4fc3a1;
}

.fl-table thead th:nth-child(odd) {
  color: #ffffff;
  flex-shrink: 3;
  background: #324960;
}

.fl-table tr:nth-child(even) {
  background: #f8f8f8;
}

/* Responsive */

@media (max-width: 767px) {
  .fl-table {
    display: block;
    width: 100%;
  }
  .table-wrapper:before {
    content: "Scroll vertically >";
    display: block;
    text-align: right;
    font-size: 11px;
    color: white;
    padding: 0 0 10px;
  }
  .fl-table thead,
  .fl-table tbody,
  .fl-table thead th {
    display: block;
  }
  .fl-table thead th:last-child {
    border-bottom: none;
  }
  .fl-table thead {
    float: left;
  }
  .fl-table tbody {
    width: auto;
    position: absolute;
    overflow-x: auto;
  }
  .fl-table td,
  .fl-table th {
    padding: 20px 0.625em 0.625em 0.625em;
    height: 60px;
    vertical-align: middle;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    width: 120px;
    font-size: 13px;
    text-overflow: ellipsis;
  }
  .fl-table thead th {
    text-align: left;
    border-bottom: 1px solid #f7f7f9;
  }
  .fl-table tbody tr {
    display: table-cell;
  }
  .fl-table tbody tr:nth-child(odd) {
    background: none;
  }
  .fl-table tr:nth-child(even) {
    background: transparent;
  }
  .fl-table tr td:nth-child(odd) {
    background: #f8f8f8;
    border-right: 1px solid #e6e4e4;
  }
  .fl-table tr td:nth-child(even) {
    border-right: 1px solid #e6e4e4;
  }
  .fl-table tbody td {
    display: block;
    text-align: center;
  }
}
</style>
