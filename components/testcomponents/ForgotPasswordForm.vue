<template>
  <div class="relative">
    <div class="formbg">
      <div class="w-full mx-auto sm:max-w-full lg:mx-auto">
        <div class="formSpace">
          <form @submit.prevent="forgetPassword">
            <h3 class="text-lg text-yellow-800">
              Enter valid email address to activate or reset your password.
            </h3>

            <div class="form-group">
              <label class="mt-4 formLabels">Email</label>
              <input
                type="email"
                placeholder="Enter your email address here to reset password"
                class="inputfields"
                v-model="user.email"
              />
            </div>

            <div class="flex space-x-4 ">
              <button type="submit" class="btnNavigation2">
                Confirm Reset
              </button>
              <nuxt-link to="/login">
                <button type="submit" class="ml-2 btnNavigation2">
                  Back to login
                </button></nuxt-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["authUser"])
  },
  data() {
    return {
      user: {
        email: ""
      }
    };
  },
  methods: {
    async forgetPassword() {
      await this.$fire.firestoreReady();
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          alert("Check your registered email to reset the password!");
          this.user = {
            email: ""
          };
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
