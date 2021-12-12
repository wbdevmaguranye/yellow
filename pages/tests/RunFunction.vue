<template>
  <div>
    <button @click="SayHello">Say Hello</button>
    <button @click="SayHelloTwo">Say Hello Two</button>
    <button @click="TestFunction">Test Function</button>
    <button @click="GetUser">Get User</button>
    <button @click="getApplication">Get Application</button>
    <pre>{{ application }}</pre>
    <pre>{{ authUser }}</pre>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("applicationStore", ["application"]),
    ...mapState(["authUser"])
  },
  methods: {
    async SayHello() {
      await this.$fire.functionsReady();
      var addMessage = this.$fire.functions.httpsCallable("helloWorld");
      addMessage()
        .then(result => {
          // Read result of the Cloud Function.
          var data = result.data;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async SayHelloTwo() {
      await this.$fire.functionsReady();
      var addMessage = this.$fire.functions.httpsCallable("helloWorldTwo");
      addMessage({ firstname: "Andy", lastname: "Fensham" })
        .then(result => {
          // Read result of the Cloud Function.
          var data = result.data;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async TestFunction() {
      await this.$fire.functionsReady();
      var addMessage = this.$fire.functions.httpsCallable("testFunction");
      addMessage()
        .then(result => {
          // Read result of the Cloud Function.
          var data = result.data;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async GetUser() {
      await this.$fire.functionsReady();
      var addMessage = this.$fire.functions.httpsCallable("getUser");
      addMessage({ uid: "eQ0PQLIyvmF4tQ5EkYPajXwRkLrg" })
        .then(result => {
          // Read result of the Cloud Function.
          var data = result.data;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getApplication() {
      this.$axios.setToken(this.authUser.idToken, "Bearer");
      this.$axios
        .$get(
          `http://localhost:5001/yellowdot/us-central1/app/GetLoanDetails?ApplicationId=0JZLlkJtZwHlwnBVmX2w&UserId=iMsADod8pvFFMIXGRFNoG5qDFyEM`
        )
        .then(result => {
          // Read result of the Cloud Function.
          var data = result;
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
