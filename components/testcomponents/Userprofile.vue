<template>
  <div>
    <div class="">
      <!-- End of Navbar -->

      <div class="md:flex no-wrap md:-mx-2 ">
        <!-- Left Side -->

        <!-- Right Side -->
        <div class="w-full h-64 mx-2 md:w-full">
          <!-- Profile tab -->
          <!-- About Section -->
          <div class="p-3 bg-gray-100 rounded-sm shadow-sm">
            <div
              class="flex items-center space-x-2 font-semibold leading-8 text-gray-900"
            >
              <span clas="text-green-500">
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span class="tracking-wide">About {{ FormData.first_name }}</span>
            </div>
            <FormulateForm
              class="classFormulate"
              :schema="schema"
              v-model="FormData"
              @submit="postData()"
            >
              <div
                class="inline-flex mt-1 mb-4 -m-4 md:-ml-4"
                v-if="!authUser.email"
              >
                <button type="submit" class="btnNavigation">
                  Save
                </button>
              </div>
              <div v-else-if="authUser.email">
                <div class="inline-flex mt-1 mb-4 -m-4 md:-ml-4">
                  <button type="submit" class="btnNavigation">
                    Update
                  </button>
                </div>
              </div>
            </FormulateForm>
            <h3 class="ml-6 text-indigo-600 underline">
              <nuxt-link to="/reset">Click here to reset password</nuxt-link>
            </h3>
          </div>
          <!-- End of about section -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: {
    appId: {
      type: String,
      default: null
    }
  },

  computed: {
    ...mapState("applicationStore", ["profiles"]),
    ...mapState(["authUser"]),
    ...mapGetters(["isAuthenticated"])
  },
  data() {
    return {
      FormData: {},

      schema: [
        {
          type: "select",
          label: "Title",
          name: "title",
          placeholder: "Select title",
          options: [
            { value: "Mr", label: "Mr" },
            { value: "Mrs", label: "Mrs" },
            { value: "Ms", label: "Ms" },
            { value: "Prof", label: "Prof" },
            { value: "Dr", label: "Dr" }
          ],
          validation: "required",
          "validation-name": "Title",
          "outer-class": ["col-span-6", "md:col-span-6"]
        },
        {
          type: "text",
          label: "First Name",
          placeholder: "First Name",
          name: "first_name",
          validation: "required",
          "validation-name": "First Name",
          "outer-class": ["col-span-6", "md:col-span-3"]
        },
        {
          type: "text",
          label: "Last Name",
          placeholder: "Last Name",
          name: "last_name",
          validation: "required",
          "validation-name": "Last Name",
          "outer-class": ["col-span-6", "md:col-span-3"]
        },

        {
          type: "email",
          label: "Email",
          placeholder: "Email",
          name: "email",
          validation: "required|email",
          "validation-name": "Email",
          "outer-class": ["col-span-6", "md:col-span-3"]
        },
        {
          type: "text",
          label: "Mobile Number",
          placeholder: "Mobile Number",
          name: "phone_number",
          validation: "bail|required|min:9,length|max:12,length|number",
          "validation-name": "Mobile Number",
          "outer-class": ["col-span-6", "md:col-span-3"]
        }
      ]
    };
  },
  methods: {
    ...mapActions("applicationStore", ["setProfilesAction"]),
    async postData() {
      if (!this.authUser.email) {
        await this.$fire.firestoreReady();

        const path = `profiles/${this.authUser.email}/Details/${this.authUser.email}`;

        const ref = this.$fire.firestore.collection(path);
        const myform = {
          ...this.FormData
        };
        const addedData = await ref.add(myform);

        this.setProfilesAction({
          ...myform,
          id: addedData.id,
          path: addedData.path
        });
      } else {
        await this.$fire.firestoreReady();
        const path = `Profiles/${this.authUser.email}/Details/${this.authUser.email}`;
        const ref = this.$fire.firestore.doc(path);
        const addedData = await ref.set(this.FormData);

        await this.readFromFirestore();
      }
    },
    //     statutsOption(){
    // let initialstat = false;
    // if(!this.isAuthenticated ){
    //     this.initialstat=false
    // }else{
    //     this.initialstat = true
    // }
    //     },

    async readFromFirestore() {
      await this.$fire.firestoreReady();

      if (this.authUser.email) {
        const path = `Profiles/${this.authUser.email}/Details/${this.authUser.email}`;
        const ref = this.$fire.firestore.doc(path);
        let snap;
        try {
          snap = await ref.get();
          if (snap.exists) {
            const formData = snap.data();
            this.FormData = { ...formData, id: snap.id };
            this.setProfilesAction({ ...formData, id: snap.id });
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  },

  async mounted() {
    await this.readFromFirestore();
  }
};
</script>
