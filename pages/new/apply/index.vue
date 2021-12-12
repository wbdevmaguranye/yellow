<template>
  <div class="container mx-auto">
    <FormulateForm
      v-model="FormData"
      @submit="postData()"
      class="classFormulate"
    >
      <FormulateInput
        class="col-span-6 md:col-span-6"
        type="select"
        name="title"
        label="Title"
        placeholder="Select title"
        validation="required"
        validation-name="Title"
        :options="{
          Mr: 'Mr',
          Mrs: 'Mrs',
          Ms: 'Ms',
          Prof: 'Prof',
          Dr: 'Dr'
        }"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="first_name"
        type="text"
        label="First Name"
        placeholder="Enter first name"
        validation="required"
        validation-name="First Name"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="last_name"
        type="text"
        label="Last Name"
        placeholder="Enter last name"
        validation="required"
        validation-name="Last Name"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        type="select"
        name="gender"
        label="Gender"
        placeholder="Select gender"
        validation="required"
        validation-name="Gender"
        :options="{
          Male: 'Male',
          Female: 'Female',
          Other: 'Other'
        }"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        type="select"
        name="identification"
        label="Identification Type"
        placeholder="Select form of legal identification e.g id/passport number"
        validation="required"
        validation-name="ID or Passport Number"
        :options="{
          IDNumber: 'Select national id number',
          PassportId: 'Select passport id number'
        }"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        v-if="FormData.identification === 'IDNumber'"
        identi
        key="IDNumber"
        name="id_number"
        label="National id number"
        placeholder="Enter national id number"
        validation="required"
        validation-name="ID Number"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        v-if="FormData.identification === 'PassportId'"
        key="PassportId"
        name="passport_number"
        label="Passport number"
        placeholder="Enter a valid passport number"
        validation="required"
        validation-name="Passport Number"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="email"
        type="email"
        label="Email"
        placeholder="Enter email address"
        validation="required|email"
        validation-name="Email"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="phone_number"
        type="text"
        label="Mobile Number"
        placeholder="Enter mobile number"
        validation="bail|required|min:9,length|max:12,length|number"
        validation-name="Mobile Number"
      />
      <FormulateInput
        class="col-span-3 md:col-span-3"
        type="select"
        name="loan_purpose"
        label="Loan Purpose"
        placeholder="Select purpose of the loan"
        validation="required"
        validation-name="Loan Purpose"
        :options="{
          HousingRelated: 'Housing and Related',
          Furniture: 'Furniture',
          SmallBusiness: 'Small Business',
          Education: 'Education',
          DebtConsolidation: 'Debt Consolidation',
          Service: 'Service',
          OtherNonEmergency: ' Other (Non-Emergency)',
          Emergency: 'Death/Funeral',
          EmergencyMedical: 'Emergency: Medical',
          Emergency: 'Loss (Theft/Fire)',
          Emergency: 'Other'
        }"
      />
      <FormulateInput
        class="col-span-3 md:col-span-3"
        type="select"
        name="duration_of_payment"
        label="Duration of Payment"
        placeholder="Select duration of payment (between 1 to 6 months)"
        validation="required"
        validation-name="Duration of Payment"
        :options="{
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
          6: '6'
        }"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        type="select"
        name="first_loan_this_year"
        label="Is this your first loan with yellowdot this year?"
        placeholder="Is this your 1st loan with yellowdot this year?"
        validation="required"
        validation-name="Duration of Payment"
        :options="{
          Yes: 'Yes',
          No: 'No'
        }"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="CleanPay"
        type="text"
        label="Clean pay Amount"
        placeholder="Enter clean pay e.g 40 000"
        validation="required|number"
        validation-name="Clean Pay Amount"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="how_much"
        type="number"
        label="Loan Amount"
        placeholder="Enter loan amount up to 8,000"
        validation="bail|required|number|between:599,8001,value"
        validation-name="Loan Amount"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="how_long_at_company"
        type="text"
        label="How long have you been working at current Company"
        placeholder="Enter duration you have been with current employer(Years)"
        validation="required|number"
        validation-name="How long at Company(Years)"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="LoanRepaymentInterval"
        type="number"
        label="Loan Repayment Interval"
        placeholder="Enter loan repayment interval e.g 1"
        step="0.01"
        validation="bail|required"
        validation-name="Loan Repayment Interval"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="address"
        type="text"
        label="Residential address"
        placeholder="Enter residential address"
        validation="required"
        validation-name="Address "
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="AddressLine2OrSuburb"
        type="text"
        label="Address Line 2 or Surbub"
        placeholder="Address 2 or surbub (Optional)"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="city"
        type="text"
        label="City"
        placeholder="Enter city"
        validation="required"
        validation-name="City"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        type="select"
        name="province"
        label="Province"
        placeholder="Select province"
        validation="required"
        validation-name="Province"
        :options="{
          Gauteng: 'Gauteng',
          EasternCape: 'Eastern Cape',
          FreeState: 'Free State',
          KwazuluNatal: 'Kwazulu Natal',
          Limpopo: 'Limpopo',
          Mpumalanga: 'Mpumalanga',
          NorthernCape: 'Northern Cape',
          NorthWest: 'North West',
          WesternCape: 'Western Cape'
        }"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        name="postal_code"
        type="text"
        label="Postal Code"
        placeholder="Enter postal code"
        validation="required"
        validation-name="Postal Code"
      />
      <div class="col-start-1 col-end-7 mt-0">
        <!-- <h1>{{ progress }}</h1> -->
        <div v-for="d in docs" :key="d.id">
          <div class="md:w-1/2">
            <label class="block text-sm font-medium text-gray-700">
              {{ d.desc }}
            </label>
          </div>
          <div class="mt-2 fileUploadInput">
            <div class="absolute">
              <div class="flex flex-col items-center">
                <i class="text-blue-700 fa fa-folder-open fa-3x"></i>
                <span class="block font-normal text-gray-400"
                  >Click to attach your {{ d.desc }} {{ d.id }}</span
                >
              </div>
            </div>
            <input
              type="file"
              @change="selectFile($event, d.id)"
              class="w-full h-full opacity-0"
              :name="d.desc"
              :id="d.id"
            />
          </div>
          {{ d.name }}
        </div>
      </div>

      <FormulateInput class="col-span-6 md:col-span-6" name="acceptTerms"
      disable: true type="checkbox" label="Accept Terms and conditions"
      placeholder="Postal Code" validation="required" validation-name="Accept
      Terms and conditions" />
      <FormulateInput type="submit" label="save" />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import axios from "axios";
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
    ...mapState(["authUser"]),
    ...mapState(["authUser", "isLoading"]),
    ...mapState("error", ["error"]),
    ...mapState("applicationStore", ["application"]),
    ...mapGetters("applicationStore", ["isdocumentsComplete"]),
    ...mapGetters("applicationStore", ["isAppComplete"])
  },
  // const terms = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit ',
  data() {
    return {
      selectedFile: null,
      FormData: {},
      docs: [
        { id: 1, desc: "Id/Passport", name: "", file: {}, url: "" },
        {
          id: 4,
          desc: "Payslip",
          name: "",
          file: {},
          url: ""
        }
      ],
      selectedFiles: {}
    };
  },
  methods: {
    ...mapActions("storagefs", ["uploadFile", "readData", "deleteFile"]),
    ...mapActions("applicationStore", ["setDocumentsAction"]),
    ...mapActions("applicationStore", ["setApplicationAction"]),
    async postData() {
      if (!this.application.id) {
        await this.$fire.firestoreReady();

        const path = `Applications/${this.authUser.id}/Apply`;

        const ref = this.$fire.firestore.collection(path);
        const myform = {
          ...this.FormData,
          createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp(),
          status: "Draft"
        };
        const addedData = await ref.add(myform);

        this.setApplicationAction({
          ...myform,
          id: addedData.id,
          path: addedData.path
        });
      } else {
        await this.$fire.firestoreReady();
        const path = `Applications/${this.authUser.id}/Apply/${this.application.id}`;
        const ref = this.$fire.firestore.doc(path);
        const addedData = await ref.set(this.FormData);

        await this.readFromFirestore();
      }
      await this.saveFiles();
      this.goToNext();
    },
    async uploadTheFile(myFile, type) {
      const filedata = await this.uploadFile({
        file: myFile,
        path: `files/${this.authUser.id}/${this.application.id}/${myFile.name}`,
        saveUrl: `AppDetails/${this.authUser.id}/DocInfo/${this.application.id}/files`,
        fileMeta: { docType: type }
      });

      return filedata;
    },
    async saveFiles() {
      this.docs.forEach((element, index) => {
        let type = this.docs[index].id;
        let file = this.selectedFiles[type].file;
        let name = this.selectedFiles[type].name;
        const fileInfo = this.uploadTheFile(file, type);
        this.docs[index].url = fileInfo;
        // console.log(type, name);
      });
    },
    async selectFile(e, type) {
      this.selectedFiles[type] = {
        name: e.target.files[0].name,
        file: e.target.files[0]
      };
      const checkFiles = this.FormData;

      // console.log(checkFiles);
      this.readFromFirestore();
      // Object.keys(checkFiles).forEach(item => {
      //   if (checkFiles[item].meta.docType == type) {
      //     // console.log(`${checkFiles[item].meta.docType}`);
      //   }
      // });

      // this.FormData.forEach((doc, index) => {
      //   //if (doc.id == type) {
      //   console.log("this.FormData[index].meta.docType");
      //   // }
      // });

      // Object.keys(checkrd).forEach(k => {
      //   console.log(k);
      // });

      // if (this.FormData) {
      //   checkrd.forEach(doc => {});
      // }
      //const fileInfo = await this.uploadTheFile(e.target.files[0], type);

      // this.docs.forEach((doc, index) => {
      //   if (doc.id == type) {
      //     this.docs[index].name = e.target.files[0].name;
      //     this.docs[index].file = e.target.files[0];
      //     this.docs[index].url = fileInfo;
      //   }
      // });
    },
    getSelectedFile(type) {
      let name = "";
      if (this.selectedFiles[type]) {
        name = this.selectedFiles[type].name;
      }
      return name;
    },

    async readFromFirestore() {
      await this.$fire.firestoreReady();
      this.application.id = this.$route.params.id;
      // console.log(this.$route.params.id);
      // console.log(this.application.key);
      if (this.application.id) {
        const path = `Applications/${this.authUser.id}/Apply/${this.application.id}`;
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
    // async readFromFirestore2() {
    //   await this.$fire.firestoreReady();
    //   // this.application.id = this.$route.params.id;

    //   if (this.authUser.id) {
    //     const path = `AppDetails/${this.authUser.id}/DocInfo/${this.application.id}/files`;
    //     const ref = this.$fire.firestore.collection(path);
    //     let snap;
    //     let list = [];
    //     try {
    //       snap = await ref.get();
    //       snap.forEach(doc => {
    //         let path = doc.ref.path;
    //         let parent = doc.ref.parent.path;

    //         let data = doc.data();

    //         data["id"] = doc.id;
    //         data["path"] = path;
    //         data["parent"] = parent;
    //         // console.log(doc.id);
    //         list.push(data);
    //       });

    //       const formData = list;

    //       this.FormData = { ...formData };

    //       this.setDocumentsAction({ ...formData });

    //       // if (snap.exists) {
    //       //   const formData = snap.data();
    //       //   this.FormData = { ...formData, id: snap.id };
    //       //   //this.setBankingDetailsAction({ ...formData, id: snap.id });
    //       // }
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // },
    goToNext() {
      this.$router.push({
        name: "personal",
        params: { id: `${this.application.id}` }
      });
    }
  },
  async mounted() {
    await this.readFromFirestore();
    // await this.readFromFirestore2();
  }
};
</script>
