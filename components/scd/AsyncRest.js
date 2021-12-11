export default {
  props: {
    path: { type: String, default: "", required: false },
    id: { type: String, default: null },
    fld: { type: String, default: "id", requred: false },
    limit: { type: Number, default: 5, requred: false }
  },
  computed: {
    hasError() {
      return this.error != "";
    }
  },
  data() {
    return {
      records: [],
      error: "",
      start: 0,
      page: 1
    };
  },

  mounted() {
    this.getRecordList();
  },
  methods: {
    async getRecordList(querystring) {
      if (this.path) {
        this.setError("");
        let path = `${this.path}?_start=${this.start}&_limit=${this.limit}`;
        if (this.id) {
          path = `${path}&${this.fld}=${this.id}`;
        }

        console.log(path);
        const todos = await this.$axios.$get(path);
        this.records = todos;
      } else {
        this.setError("Please specify URL endpoint to get data");
      }
    },
    makeQueryString() {},
    setError(error) {
      this.error = error;
    },
    next() {
      this.page += 1;
      this.start = this.start + this.limit + 1;
    },
    prev() {
      if (this.start - this.limit - 1 >= 0) {
        this.page -= 1;
        this.start = this.start - this.limit - 1;
      }
    },
    first() {
      this.page = 1;
      this.start = 0;
    }
  },
  render() {
    return this.$scopedSlots.default({
      records: this.records,
      getRecordList: this.getRecordList,
      error: this.error,
      hasError: this.hasError,
      next: this.next,
      prev: this.prev,
      first: this.first,
      page: this.page
    });
  },

  async fetch() {
    await this.getRecordList();
  },
  watch: {
    start(newValue, oldValue) {
      this.getRecordList();
    }
  }
};
