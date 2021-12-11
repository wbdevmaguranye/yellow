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
          <h2 class="mt-6 text-3xl font-bold text-center text-gray-700">
            Sign up or login
          </h2>
        </div>
        <div class="px-4 py-6 rounded shadow-lg">
          <div class="mt-1">
            <form
              @submit.prevent="registerUser"
              action="#"
              method="POST"
              class="grid grid-cols-1 gap-y-6"
            >
              <div>
                <label for="fullname" class="sr-only">Full Name</label>
                <input
                  id="fullname"
                  name="fullname"
                  type="fullname"
                  class="inputfields"
                  v-model="fullname"
                  placeholder="Full Name"
                />
              </div>
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
                  autocomplete="current-password"
                  class="inputfields"
                  v-model="password"
                  placeholder="Password"
                />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    for="remember_me"
                    class="block ml-4 text-sm text-yellow-600"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a
                    href="\reset"
                    class="font-medium text-yellow-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <nuxt-link
                  to="/login"
                  class="inline-flex justify-center px-10 py-3 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to login
                </nuxt-link>
                <button
                  type="submit"
                  class="inline-flex justify-center px-10 py-3 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["register"]),
    async registerUser() {
      await this.$fire.firestoreReady();
      let payload = {
        email: this.email,
        password: this.password,
        data: {
          fullname: this.fullname,
          validated: false,
          createdAt: this.$fireModule.firestore.FieldValue.serverTimestamp()
        },
        routeInfo: "/apply"
      };
      console.log(payload);
      this.register(payload);
    }
  },
  computed: {
    ...mapState("error", ["error"])
  },
  data() {
    return {
      fullname: "",
      email: "",
      password: ""
    };
  }
};
</script>
