<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="min-h-screen bg-white">
    <nav class="bg-white border-b border-gray-200">
      <div class="mx-auto ml-8 max-w-auto sm:px-6 lg:px-0">
        <div class="flex justify-between h-20">
          <div class="flex">
            <div class="flex items-center flex-shrink-0">
              <img
                class="hidden w-auto h-20 lg:block"
                src="~/assets/img/yellowdotlogo.jpeg"
                alt="Workflow"
              />
            </div>
            <div
              class="hidden md:flex-wrap sm:-my-px sm:ml-6 sm:flex sm:space-x-8"
            >
              <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <a
                href="/"
                class="inline-flex items-center px-1 pt-1 text-lg font-medium text-yellow-900 hover:text-gray-700 "
              >
                Home
              </a>

              <!--
              <NuxtLink
                to="/finance"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              >
                Finance Products
              </NuxtLink> -->
              <NuxtLink
                to="/registration"
                class="inline-flex items-center px-1 pt-1 text-lg font-medium text-yellow-900 hover:text-gray-700 "
              >
                Visitors - click here
              </NuxtLink>
              <NuxtLink
                v-show="!isAuthenticated"
                to="/login"
                class="inline-flex items-center px-1 pt-1 text-lg font-medium text-yellow-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              >
                Administrators - click here
              </NuxtLink>
              <NuxtLink
                v-show="isAuthenticated"
                to="/visitors"
                class="inline-flex items-center px-1 pt-1 text-lg font-medium text-yellow-900 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              >
                List of visitors
              </NuxtLink>
              <a
                v-show="isAuthenticated"
                @click="signingOut()"
                class="inline-flex items-center px-1 pt-1 text-lg font-medium text-yellow-900 border-b-2 border-transparent cursor-pointer hover:border-gray-300 hover:text-gray-700"
              >
                Sign out
              </a>
            </div>
          </div>

          <div class="hidden sm:ml-6 sm:flex sm:items-center md:isolation-auto">
            <NuxtLink
              v-if="!authUser"
              v-show="authUser"
              to="/login"
              class="block px-4 py-2 text-lg text-yellow-900 hover:bg-gray-100"
              role="menuitem"
            >
              Login
            </NuxtLink>
            <a
              v-else-if="authUser"
              v-show="authUser"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <span class="text-yellow-900"> Logged as</span><br />
              <span class="text-yellow-500 ">{{ authUser.email }}</span>
            </a>
            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div>
                <button
                  @click="showProfile = !showProfile"
                  type="button"
                  class="flex items-center max-w-xs text-sm bg-white rounded-full "
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <img
                    class="w-8 h-8 mr-4 rounded-full"
                    src="https://images.unsplash.com/photo-1490814525860-594e82bfd34a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwY2lyY2xlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </button>
              </div>

              <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
              <div
                v-show="showProfile"
                class="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <button
                  @click="showProfile = !showProfile"
                  type="button"
                  class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                ></button>
                <button
                  @click="showProfile = !showProfile"
                  type="button"
                  class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <NuxtLink
                    v-show="!isAuthenticated"
                    to="/login"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Login
                  </NuxtLink>
                  <a
                    v-show="isAuthenticated"
                    @click="signingOut()"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </button>
              </div>
            </div>
          </div>
          <!-- start testing application here -->
          <div class="flex items-center -mr-2 sm:hidden">
            <!-- Mobile menu button -->
            <button
              @click="showMobile = !showMobile"
              type="button"
              class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
              <svg
                class="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
              <svg
                class="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div v-show="showMobile" class="sm:hidden" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1">
          <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" -->
          <a href="/" class="npm py-2 pl-3 pr-4 font-medium text-yellow-900">
            Home
          </a>

          <NuxtLink
            to="/registration"
            class="block py-2 pl-3 pr-4 text-base font-medium text-yellow-900 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Visitors - click here
          </NuxtLink>

          <NuxtLink
            v-show="!isAuthenticated"
            to="/login"
            class="block py-2 pl-3 pr-4 text-base font-medium text-yellow-900 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Administrators - click here
          </NuxtLink>
          <nuxt-link
            v-show="isAuthenticated"
            to="/visitors"
            class="block py-2 pl-3 pr-4 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >List of visitors</nuxt-link
          >
          <a
            v-show="isAuthenticated"
            @click="signingOut()"
            class="block py-2 pl-3 pr-4 text-base font-medium text-yellow-900 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Sign out
          </a>
        </div>
      </div>
    </nav>

    <!-- <main>
       <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">-->
    <div class="bg-gray-50">
      <!-- Replace with your content -->
      <Nuxt />
      <!-- /End replace -->
    </div>
    <!--</main> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  // middleware: "authenticated",
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["authUser"]),
    ...mapState("error", ["error"])
  },
  data() {
    return {
      showMobile: false,
      showProfile: false,
      buttonApply: false
    };
  },
  methods: {
    ...mapActions("applicationStore", ["resetDefaultState"]),
    ...mapActions(["signOut"]),
    gotoLink(link) {
      this.$router.push(link);
    },
    signingOut() {
      console.log("I am signing out for real");
      this.resetDefaultState();
      this.signOut();
    }
    // getUser() {
    //   let email = this.authUser.email;
    //   console.log(email);
    // }
  }
  // async mounted() {
  //   await this.getUser();
  //   console.log("this.email");
  //   console.log(this.email);
  // }
};
</script>

<style>
/* home route and active route will show in bold as it matches / and /NuxtLinkbout */
a.nuxt-link-active {
  font-weight: 900;
  color: #78350f;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #78350f;
}
</style>
