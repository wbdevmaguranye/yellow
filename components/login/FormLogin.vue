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
          <h2 class="mt-6 text-3xl font-bold text-center text-gray-600">
            Sign up or login
          </h2>
        </div>
        <div class="px-4 py-6 rounded shadow-lg">
          <div class="mt-1">
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
                  <nuxt-link
                    to="/reset"
                    class="font-medium text-yellow-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </nuxt-link>
                </div>
              </div>
              <div>
                <nuxt-link
                  to="/register"
                  class="inline-flex justify-center px-10 py-3 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </nuxt-link>
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
      email: "jmaguranye@gmail.com",
      password: "@@testing123",
      fullname: ""
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
  }
};
</script>
