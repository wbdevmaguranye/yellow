import { mapState, mapActions, mapGetters } from "vuex";
import firestore from "firebase/app";
export default {
  props: {
    path: { type: String, default: "", required: true },
    sorting: { type: Array, default: () => [] },
    filtering: { type: Array, default: () => [] },
    tableId: { type: String, required: true },
    pageSize: { type: Number, default: 5, required: false },
    shouldSync: { type: Boolean, default: false, required: false },
    paging: { type: Boolean, default: false, required: false },
    primaryKey: { type: String, default: null }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["authUser", "isLoading"]),
    ...mapState("error", ["error"]),

    records() {
      return this.$store.state.firestoregeneric.recordsets[this.tableId] || {};
    }
  },
  data() {
    return {
      loading: false
    };
  },
  watch: {
    path() {
      this.getRecord();
    },
    filtering: {
      handler() {
        this.getRecord();
      },
      deep: true
    },
    sorting: {
      handler() {
        this.getRecord();
      },
      deep: true
    },
    // pageNumber() {
    //   this.getRecordList()
    // },
    firstDoc: function(_, oldDoc) {
      console.info("Updating prevFirst");
      this.prevFirstDoc = oldDoc;
    },
    lastDoc: function(_, oldDoc) {
      console.info("Updating prevLast");
      this.prevLastDoc = oldDoc;
    }
  },
  mounted() {
    this.getRecord();
  },
  methods: {
    ...mapActions("firestoregeneric", [
      "addDocument",
      "deleteDocument",
      "updateDocument",
      "clearListeners",
      "readSingleDocument"
    ]),

    async getRecord() {
      this.loading = true;
      if (this.records.id) {
        await this.readSingleDocument({
          path: this.path,
          shouldSync: this.shouldSync,
          onCompleteAction: {
            actionType: "commit",
            actionName: "firestoregeneric/UPDATE_TABLE_RECORDS"
            // we don't add payload
          },
          tableId: this.tableId
        });
      }
      this.loading = false;
    },
    async addRecord(record) {
      this.loading = true;
      await this.addDocument({
        path: this.path,
        data: { ...record }
      });
      await this.getRecord();
      this.loading = false;
    },
    async deleteRecord(record) {
      this.loading = true;
      this.deleteDocument({
        path: record.path
      });
      this.loading = false;
    },
    async updateRecord(record) {
      let path = null;
      if (record && record.path) {
        path = record.path;
      } else {
        path = this.path;
      }
      this.loading = true;
      this.updateDocument({
        path: path,
        doc: record
      });
      this.loading = false;
      await this.getRecord();
    },
    getFields() {
      let keys = [];
      let flds = [];
      if (this.records.length > 0) {
        keys = Object.keys(this.records[0]);
        keys.forEach(key => {
          let fldtype = typeof this.records[0][key];
          let fld = { field: key, fldType: fldtype };
          flds.push(fld);
        });
      }
      return flds;
    }
  },
  render() {
    return this.$scopedSlots.default({
      pending: this.isLoading,
      errorMsg: this.error,
      data: this.records,
      getRecord: this.getRecord,
      addRecord: this.addRecord,
      deleteRecord: this.deleteRecord,
      updateRecord: this.updateRecord,
      getFields: this.getFields
    });
  },
  destroyed() {
    if (this.shouldSync) {
      this.clearListeners();
    }
  },
  async fetch() {
    await this.getRecord();
  }
};
