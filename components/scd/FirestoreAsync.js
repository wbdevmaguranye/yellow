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
    paging: { type: Boolean, default: false, required: false }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["authUser", "isLoading"]),
    ...mapState("error", ["error"]),
    ...mapState("firestoregeneric", ["firstDoc", "lastDoc"]),
    records() {
      return this.$store.state.firestoregeneric.recordsets[this.tableId] || [];
    }
  },
  data() {
    return {
      pageNumber: 1,
      loading: false,
      prevLastDoc: null,
      prevFirstDoc: null
    };
  },
  watch: {
    path() {
      this.getRecordList();
    },
    filtering: {
      handler() {
        this.getRecordList();
      },
      deep: true
    },
    sorting: {
      handler() {
        this.getRecordList();
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
    this.getRecordList();
  },
  methods: {
    ...mapActions("firestoregeneric", [
      "readListData",
      "addDataToList",
      "addDocument",
      "deleteDocument",
      "updateDocument",
      "clearListeners",
      "readSingleDocument"
    ]),
    async next() {
      this.pageNumber += 1;
      await this.readListData({
        path: this.path,
        shouldSync: this.shouldSync,
        onCompleteAction: {
          actionType: "commit",
          actionName: "firestoregeneric/UPDATE_TABLE_RECORDS"
          // we don't add payload
        },
        // sorting: this.sorting,
        // filtering: this.filtering,
        paging: {
          pageSize: this.pageSize,
          lastDoc: this.lastDoc,
          mutations: {
            firstItemMutation: "firestoregeneric/UPDATE_FIRST_DOC",
            lastItemMutation: "firestoregeneric/UPDATE_LAST_DOC"
          }
        },
        sorting: this.sorting,
        tableId: this.tableId
      });
    },
    first() {
      this.pageNumber = 1;
    },
    async prev() {
      if (this.pageNumber > 1) {
        this.pageNumber -= 1;
      }
      let paging = null;
      if (this.paging) {
        paging = {
          pageSize: this.pageSize,
          mutations: {
            firstItemMutation: "firestoregeneric/UPDATE_FIRST_DOC",
            lastItemMutation: "firestoregeneric/UPDATE_LAST_DOC"
          }
        };
        if (this.records.length > 0) {
          paging.firstDoc = this.firstDoc;
        } else {
          paging.lastDoc = this.prevLastDoc;
        }
      }

      await this.readListData({
        path: this.path,
        shouldSync: this.shouldSync,
        onCompleteAction: {
          actionType: "commit",
          actionName: "firestoregeneric/UPDATE_TABLE_RECORDS"
          // we don't add payload
        },
        sorting: this.sorting,
        filtering: this.filtering,
        paging: paging,
        tableId: this.tableId
      });
    },
    async getRecordList() {
      let paging = null;
      if (this.paging) {
        paging = {
          pageSize: this.pageSize,
          mutations: {
            firstItemMutation: "firestoregeneric/UPDATE_FIRST_DOC",
            lastItemMutation: "firestoregeneric/UPDATE_LAST_DOC"
          }
        };
        if (this.records.length > 0) {
          paging.firstDoc = this.firstDoc;
        } else {
          paging.lastDoc = this.prevLastDoc;
        }
      }
      this.loading = true;
      await this.readListData({
        path: this.path,
        shouldSync: this.shouldSync,
        onCompleteAction: {
          actionType: "commit",
          actionName: "firestoregeneric/UPDATE_TABLE_RECORDS"
          // we don't add payload
        },
        // sorting: this.sorting,
        // filtering: this.filtering,
        paging: paging,
        sorting: this.sorting,
        filtering: this.filtering,
        tableId: this.tableId
      });
      this.loading = false;
    },
    async addRecord(record) {
      this.loading = true;
      await this.addDataToList({
        path: this.path,
        data: { ...record }
      });
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
      this.loading = true;
      this.updateDocument({
        path: record.path,
        doc: record
      });
      this.loading = false;
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
      pending: this.loading,
      errorMsg: this.error,
      data: this.records,
      pageNumber: this.pageNumber,
      next: this.next,
      prev: this.prev,
      first: this.first,
      getRecordList: this.getRecordList,
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
    await this.getRecordList();
  }
};
