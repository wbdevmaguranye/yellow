<template>
  <div class="px-2 py-1 md:px-6">
    <h3 class="hmain">Conditions of loan application: Required documents</h3>
    <p class="mt-4">
      <strong>Note:</strong> Quotations are valid for 5 business days. You must
      send us any documents we asked for within this period. We will not pay out
      your loan amount before we receive and validate the documents.
    </p>
    <p class="mt-4 mb-2">
      These may include your ID/Passport, proof of your residency/address, proof
      of payment of the initiation fee and proof of credit life insurance policy
    </p>
    <h1>{{ progress }}</h1>
    <div v-for="d in docs" :key="d.id">
      <div class="md:w-1/2">
        <label class="block text-sm font-medium text-gray-700">
          {{ d.desc }}
        </label>
      </div>

      <div class="fileUploadInput">
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
    <button class="btnNavigation mt-2">Save Files</button>
    <p class="mt-4">
      Applications, quotations and acceptance thereof maybe telephonic, in which
      case such conversations will be voice
    </p>
    <p class="mt-4">
      <strong>1.</strong> By applying for a personal loan you confirm that:
    </p>
    <p class="mt-4">
      <strong>1.1.</strong> You are not under administration, sequestration,
      debt review or a restructuring order and have been declared mentally unfit
      by an order of court
    </p>
    <p class="mt-4">
      <strong>1.2.</strong> All information you give us is true and correct
    </p>
    <p class="mt-4">
      <strong> 1.3. </strong> You will ensure that you have read and understood
      the pre-agreement statement that follows before accepting any loan amount
      that you maybe offred.
    </p>
    <p class="mt-4">
      <strong>2.</strong> By signing below you agree that Wozipo may:
    </p>
    <p class="mt-4">
      <strong> 2.1.</strong> Conduct any enquiry necessary to process your
      application
    </p>
    <p class="mt-4">
      <strong> 2.2.</strong> may contact you regarding your loan application, or
      in connection with any loan that may be subsequently approved, by SMS or
      Email wher applicable
    </p>
    <div class="flex justify-between">
      <div class="p-2 m-2">Customer Signature</div>
      <div class="p-2 m-2">Date</div>
      <div class="p-2 m-2">Witness</div>
    </div>
    <!-- <ul>
      <li v-for="dlist in docs" :key="dlist.id">{{ dlist.name }}</li>
    </ul> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState("storagefs", ["files", "progress"]),
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["authUser", "isLoading"]),
    ...mapState("error", ["error"]),
    ...mapState("applicationStore", ["application"]),
  },
  methods: {
    ...mapActions("storagefs", ["uploadFile", "readData", "deleteFile"]),
    async uploadTheFile(myFile, type) {
      const filedata = await this.uploadFile({
        file: myFile,
        path: `files/${this.authUser.id}/${this.application.id}/${myFile.name}`,
        saveUrl: `AppDetails/${this.authUser.id}/DocInfo/${this.application.id}/files`,
        fileMeta: { docType: type },
      });
      console.log(filedata);
      return filedata;
    },
    async selectFile(e, type) {
      this.selectedFiles[type] = {
        name: e.target.files[0].name,
        file: e.target.files[0],
      };
      const fileInfo = await this.uploadTheFile(e.target.files[0], type);

      this.docs.forEach((doc, index) => {
        if (doc.id == type) {
          this.docs[index].name = e.target.files[0].name;
          this.docs[index].file = e.target.files[0];
          this.docs[index].url = fileInfo;
        }
      });
    },

    getSelectedFile(type) {
      let name = "";
      if (this.selectedFiles[type]) {
        name = this.selectedFiles[type].name;
      }
      return name;
    },
  },
  data() {
    return {
      docs: [
        { id: 1, desc: "Id/Passport", name: "", file: {}, url: "" },
        {
          id: 2,
          desc: "Proof of residence/address",
          name: "",
          file: {},
          url: "",
        },
        {
          id: 3,
          desc: "Proof of payment of initiation fee",
          name: "",
          file: {},
          url: "",
        },
        {
          id: 4,
          desc: "Proof of credit life insurance policy",
          name: "",
          file: {},
          url: "",
        },
      ],
      selectedFiles: {},
    };
  },
};
</script>
