<template>
  <div>
    <div class="">
      <!-- End of Navbar -->

      <div class="md:flex no-wrap md:-mx-2 ">
        <!-- Left Side -->

        <!-- Right Side -->
        <div class="w-full h-64 mx-2 md:w-full">
          <!-- Profile tab -->
          <!-- About Section -->

          <!-- End of about section -->

          <div class="my-4"></div>
          <!-- About Section -->
          <div class="p-3 bg-gray-100 rounded-sm shadow-sm">
            <div
              class="flex items-center space-x-2 font-semibold leading-8 text-gray-900"
            >
              <span clas="text-green-500">
                <svg
                  class="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span class="tracking-wide">Reset password</span>
            </div>
            <FormulateForm
              class="classFormulate"
              :schema="schema"
              v-model="FormData"
            >
              <div class="inline-flex mt-1 mb-4 -m-4 md:-ml-4">
                <div v-if="!isAuthenticated">
                  <button type="submit" class="btnNavigation">
                    <nuxt-link to="/login">
                      Reset
                    </nuxt-link>
                  </button>
                </div>
                <div v-else-if="isAuthenticated">
                  <button type="submit" class="btnNavigation">
                    <nuxt-link to="/login">
                      Reset
                    </nuxt-link>
                  </button>
                </div>
              </div>
            </FormulateForm>
          </div>
          <!-- End of about section -->

          <!-- End of profile tab -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: {
    appId: {
      type: String,
      default: null
    }
  },

  computed: {
    ...mapState("applicationStore", ["profiles"]),
    ...mapState(["authUser"]),
    ...mapGetters(["isAuthenticated"])
  },
  data() {
    return {
      FormData: {
        email_address: "jma@yahoo.com",
        password: "11111",
        password_confirm: "11111"
      },

      schema: [
        {
          type: "email",
          label: "Enter your email",
          placeholder: "email",
          name: "email_address",
          validation: "required|email",
          "validation-name": "Email",
          "outer-class": ["col-span-6", "md:col-span-6"]
        },
        {
          type: "password",
          name: "password",
          label: "Enter a new password",
          placeholder: "new password",
          validation: "required",
          "outer-class": ["col-span-6", "md:col-span-3"]
        },
        {
          type: "password",
          name: "password_confirm",
          label: "Confirm your password",
          placeholder: "confirm new password",
          validation: "^required|confirm:password",
          validationName: "Password confirmation",
          "outer-class": ["col-span-6", "md:col-span-3"]
        }
      ]
    };
  },
  methods: {}
};
</script>
