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
        placeholder="Select Title"
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
        placeholder="First Name"
        validation="required"
        validation-name="First Name"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="last_name"
        type="text"
        label="Last Name"
        placeholder="Last Name"
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
        label="Select identification"
        placeholder="Select form of legal identification e.g ID/Passport number"
        validation="required"
        validation-name="ID or Passport Number"
        :options="{
          IDNumber: 'ID Number',
          PassportId: 'Passport Id'
        }"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        v-if="FormData.identification === 'IDNumber'"
        identi
        key="IDNumber"
        name="id_number"
        label="Enter your national ID number"
        placeholder="enter national id number"
        validation="required"
        validation-name="ID Number"
      />
      <FormulateInput
        class="col-span-6 md:col-span-6"
        v-if="FormData.identification === 'PassportId'"
        key="PassportId"
        name="passport_number"
        label="Enter your passport number"
        placeholder="enter valid passport number"
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
        placeholder="Mobile Number"
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
        label="Is this your first loan with wozipo this year?"
        placeholder="Is this your 1st loan with wozipo this year?"
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
        placeholder="Loan Amount up to 8,000"
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
        placeholder="Ente residential address"
        validation="required"
        validation-name="Address "
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="AddressLine2OrSuburb"
        type="text"
        label="Address Line 2 or Surbub"
        placeholder="Addres 2 or surbub (Optional)"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        name="city"
        type="text"
        label="City"
        placeholder="Enter City"
        validation="required"
        validation-name="City"
      />
      <FormulateInput
        class="col-span-6 md:col-span-3"
        type="select"
        name="province"
        label="Province"
        placeholder="Select Province"
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
        placeholder="Postal code"
        validation="required"
        validation-name="Postal Code"
      />
      <div class="inline-flex mt-1 mb-4 -m-4 md:-ml-4">
        <button v-if="!application.id" type="submit" class="btnNavigation">
          Apply
        </button>
        <button v-if="application.id" type="submit" class="btnNavigation">
          Update
        </button>
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
  // middleware: "authenticated",
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
      this.goToNext();
    },
    // documents start here
    // async uploadTheFile(myFile, type) {
    //   const filedata = await this.uploadFile({
    //     file: myFile,
    //     path: `files/${this.authUser.id}/${this.application.id}/${myFile.name}`,
    //     saveUrl: `AppDetails/${this.authUser.id}/DocInfo/${this.application.id}/files`,
    //     fileMeta: { docType: type }
    //   });

    //   return filedata;
    // },
    // async selectFile(e, type) {
    //   this.selectedFiles[type] = {
    //     name: e.target.files[0].name,
    //     file: e.target.files[0]
    //   };
    //   const checkFiles = this.FormData;

    //   // console.log(checkFiles);
    //   await this.makeupData();
    //   Object.keys(checkFiles).forEach(item => {
    //     if (checkFiles[item].meta.docType == type) {
    //       console.log(`${checkFiles[item].meta.docType}`);
    //     }
    //   });

    //   const fileInfo = await this.uploadTheFile(e.target.files[0], type);

    //   this.docs.forEach((doc, index) => {
    //     if (doc.id == type) {
    //       this.docs[index].name = e.target.files[0].name;
    //       this.docs[index].file = e.target.files[0];
    //       this.docs[index].url = fileInfo;
    //     }
    //   });
    // },
    // getSelectedFile(type) {
    //   let name = "";
    //   if (this.selectedFiles[type]) {
    //     name = this.selectedFiles[type].name;
    //   }
    //   return name;
    // },

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
    }
    // async makeupData() {
    //   await this.$fire.firestoreReady();
    // this.application.id = this.$route.params.id;

    // if (this.application.id) {
    //   const path = `AppDetails/${this.authUser.id}/DocInfo/${this.application.id}/files`;
    //   const ref = this.$fire.firestore.collection(path);
    //   let snap;
    //   let list = [];
    //   try {
    //     snap = await ref.get();
    //     snap.forEach(doc => {
    //       let path = doc.ref.path;
    //       let parent = doc.ref.parent.path;

    //       let data = doc.data();

    //       data["id"] = doc.id;
    //       data["path"] = path;
    //       data["parent"] = parent;
    //       // console.log(doc.id);
    //       list.push(data);
    //     });

    //     const formData = list;

    //     this.FormData = { ...formData };

    //     this.setDocumentsAction({ ...formData });
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
  },
  goToNext() {
    this.$router.push({
      name: "personal",
      params: { id: `${this.application.id}` }
    });
  },

  async mounted() {
    await this.readFromFirestore();
  }
};
</script>
