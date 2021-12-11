<template>
  <div>
    <button @click="getLoan()">Get Loan</button>
    <button @click="addMsg()">Add Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicationId: "u98dW8uA7jeg8IbLOqP6YU4Kttt1",
      loanDetails: {},
      addMsgdata: {}
    };
  },
  methods: {
    async getLoan() {
      await this.$fire.functionsReady();
      const res = await this.$fire.functions.httpsCallable(
        "app-GetLoanDetails"
      )({ applicationId: this.applicationId });
      this.loanDetails = res.data;
    },
    async addMsg() {
      await this.$fire.functionsReady();

      const res = await this.$fire.functions.httpsCallable("helloWorld")({
        text: "this is the message"
      });

      this.addMsgdata = res.data;
    }
  }
};
</script>

<style></style>
