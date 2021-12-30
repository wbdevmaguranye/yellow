<template>
  <section>
    <div
      class="flex items-center justify-center px-4 py-12 min-h-auto sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md space-y-8">
        <div>
          <img
            class="w-auto h-20 mx-auto"
            src="~/assets/img/yellowdotlogo.jpeg"
            alt="Workflow"
          />
          <p class="mt-6 text-3xl font-bold text-center text-gray-600">
            login portal
          </p>
        </div>

        <p class="text-sm text-red-600">
          Please:
          <a href="/reset" class="text-yellow-600 hover:text-indigo-500"
            >click here</a
          >
          or the set new password link below to activate your admin account.
        </p>

        <div class="px-4 py-6 rounded shadow-lg">
          <div class="mt-0">
            <form
              @submit.prevent="postData"
              action="#"
              method="POST"
              class="grid grid-cols-1 gap-y-6"
            >
              <div>
                <label for="full_name" class="sr-only">Username</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autocomplete="name"
                  class="inputfields"
                  v-model="email"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="Password"
                  class="inputfields"
                  v-model="password"
                  placeholder="Password"
                />
              </div>

              <div class="flex justify-between">
                <div class="text-sm">
                  <label for="" class="text-gray-600">New?</label>
                  <a
                    href="/reset"
                    class="text-yellow-600 hover:text-indigo-500"
                  >
                    Click here to set new password.</a
                  >
                </div>

                <div class="text-sm">
                  <label class="text-gray-600">
                    Forgot password?
                  </label>
                  <a
                    href="/reset"
                    class="text-yellow-600 hover:text-indigo-500"
                  >
                    Click here.
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="inline-flex justify-center px-10 py-3 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("error", ["error"])
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    postData() {
      try {
        const payload = {
          email: this.email,
          password: this.password,
          routerInfo: "/visitors"
        };

        this.login(payload);
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {
    // this.$router.go();
  }
};
</script>
