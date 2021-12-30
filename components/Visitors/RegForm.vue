<template>
  <div class="container mx-auto">
    <p
      class="p-3 mt-8 text-xl tracking-tight text-justify text-gray-700 md:flex"
    >
      Please respond to each of the following questions truthfully and to the
      best of your ability. Your participation is important to help us take
      precautionary measures to protect you and our personnel.
    </p>
    <FormulateForm
      :schema="schema"
      v-model="FormData"
      @submit="postData()"
      class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8"
    >
      <div class="pt-5">
        <FormulateInput class="col-span-6 ml-0 bg-white md:col-span-6 checked:bg-blue-600 checked:border-blue-600 " name="acceptTerms"
        disable: true type="checkbox" label="I hereby certify that the responses
        provided above are true and accurate to the best of my knowledge. "
        validation="required" validation-name="Accept Terms and conditions" />
        <FormulateInput type="submit" label="SAVE" />
      </div>
    </FormulateForm>
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
    ...mapState("applicationStore", ["visitor"]),
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["authUser"]),
    ...mapState(["authUser", "isLoading"]),
    ...mapState("error", ["error"]),
    ...mapState("applicationStore", ["application"]),
    ...mapGetters("applicationStore", ["isdocumentsComplete"]),
    ...mapGetters("applicationStore", ["isAppComplete"])
  },
  data() {
    return {
      writeSuccessful: false,
      FormData: {},
      schema: [
        {
          component: "h3",
          class:
            "text-lg font-bold font-medium leading-6 text-gray-600 mt-8 mb-4",
          children: "Personal Details"
        },
        {
          type: "select",
          label: "Select your current country of residency.",
          name: "country",
          inputmode: "select",
          placeholder: "Select an country",
          validation: "required",
          "validation-name": "Select country",
          options: [
            { value: "South Africa", label: "South Africa" },
            { value: "Cameroon", label: "Cameroon" },
            { value: "Nigeria", label: "Nigeria" },
            { value: "Ivory Cost", label: "Ivory Cost" }
          ],
          "outer-class": ["flex-grow"]
        },
        {
          component: "div",
          class: "flex mt-4",

          children: [
            {
              type: "text",
              label: "First Name",
              placeholder: "Enter your name",
              name: "first_name",
              inputmode: "text",
              validation: "required",
              "validation-name": "First name",
              "outer-class": ["w-2/4 mr-4"]
            },
            {
              type: "text",
              label: "Last Name",
              placeholder: "Enter your lastname",
              name: "last_name",
              inputmode: "text",
              validation: "required",
              "validation-name": "Last name",
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "number",
              label: "Phone Number",
              placeholder: "Enter your phone number",
              name: "phone_number",
              inputmode: "number",
              validation: "required",
              "validation-name": "Phone number",
              "outer-class": ["w-2/4 mr-4"]
            },
            {
              type: "text",
              label: "Reason for visit",
              placeholder: "Enter reason for visit",
              name: "reason",
              inputmode: "text",
              validation: "required",
              "validation-name": "Reason of visit",
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "h3",
          class: "text-lg font-bold font-medium leading-6 text-gray-600 mt-6",
          children: "Representations"
        },
        {
          component: "p",
          class: "text-sm  font-medium leading-6 text-gray-900 mt-2",
          children:
            "1) Are you currently experiencing, or have experienced in the past 14 days, any of the following symptoms? (Please take your temperature before you answer this question)"
        },

        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "text",
              label: "a.Temperature",
              placeholder: "Enter your captured temperature e.g 35.7",
              name: "fever",
              inputmode: "text",
              validation: "required",
              "validation-name": "Captured temperature",
              "outer-class": ["w-2/4 mr-4"]
            },
            {
              type: "select",
              label: "b. Cough ",
              name: "cough",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              label: "c. Shortness of breath",
              name: "shortness_of_breath",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["w-2/4 mr-4"]
            },
            {
              type: "select",
              label: "d. Sore throat ",
              name: "sore_throat",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              label: "e. Loss of smell or taste ",
              name: "loss_of_smell",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["w-2/4 mr-4"]
            },
            {
              type: "select",
              label: "f. Chills",
              name: "chills",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              label: "g. Head,muscle aches",
              name: "muscle_aches",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["w-2/4 mr-4"]
            },
            {
              type: "select",
              label: "h. Nausea, diarrhoea",
              name: "vomiting",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },

        {
          component: "h3",
          class: "text-sm  font-medium leading-6 text-gray-900 mt-6",
          children:
            "2) In the past 14 days, have you been in close contact with anyone who was experiencing any of the above symptoms or has experienced any of the above symptoms since your contact?"
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              name: "contact",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "h3",
          class: "text-sm  font-medium leading-6 text-gray-900 mt-6",
          children:
            "3) In the past 14 days, have you been in close contact with anyone who has tested positive from Covid-19?"
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              name: "tested",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "h3",
          class: "text-sm  font-medium leading-6 text-gray-900 mt-6",
          children:
            "4) Have you been tested for Covid-19 and are waiting to receive the results?"
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              name: "waiting_results",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "h3",
          class: "text-sm  font-medium leading-6 text-gray-900 mt-6",
          children:
            "5) Have you tested positive for Covid-19 or are you presumptively positive for Covid-19?"
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              name: "do_you_have_covid",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        },
        {
          component: "h3",
          class: "text-sm font-medium leading-6 text-gray-900 mt-6",
          children:
            "6) In the past 14 days, have you been on a commercial flight or travelled outside of the country?"
        },
        {
          component: "div",
          class: "flex mt-4",
          children: [
            {
              type: "select",
              name: "have_you_travelled",
              inputmode: "select",
              placeholder: "Select an option",
              validation: "required",
              "validation-name": "Select option",
              options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ],
              "outer-class": ["flex-grow"]
            }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions("applicationStore", ["setApplicationAction"]),
    ...mapActions("storagefs", ["uploadFile", "readData", "deleteFile"]),
    async postData() {
      if (!this.application.id) {
        await this.$fire.firestoreReady();

        const path = `Applications`;

        const ref = this.$fire.firestore.collection(path);
        const myform = {
          ...this.FormData,
          createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp()
          // status: "Draft"
        };
        const addedData = await ref.add(myform);

        this.setApplicationAction({
          ...myform,
          id: addedData.id,
          path: addedData.path
        });
      } else {
        await this.$fire.firestoreReady();
        const path = `Applications/${this.application.id}`;
        const ref = this.$fire.firestore.doc(path);
        const addedData = await ref.set(this.FormData);

        await this.readFromFirestore();
      }
      this.goToNext();
    },

    async readFromFirestore() {
      await this.$fire.firestoreReady();
      this.application.id = this.$route.params.id;
      // console.log(this.$route.params.id);
      // console.log(this.application.key);
      if (this.application.id) {
        const path = `Applications/${this.application.id}`;
        const ref = this.$fire.firestore.doc(path);
        let snap;
        try {
          snap = await ref.get();
          if (snap.exists) {
            const formData = snap.data();
            this.FormData = { ...formData, id: snap.id };
            this.setApplicationAction({ ...formData, id: snap.id });
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    goToNext() {
      this.$router.push("/finish");
    }
  },
  async mounted() {
    await this.readFromFirestore();
  }
};
</script>
