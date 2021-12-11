<template>
  <div>
    <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
    <div class="bg-white">
      <header>
        <div class="relative bg-white">
          <div
            class="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 md:justify-start md:space-x-10 lg:px-8"
          >
            <div class="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span class="sr-only">Workflow</span>
                <img
                  class="w-auto h-40 sm:h-10"
                  src="~/assets/img/yellowdotlogo.jpeg"
                  alt=""
                />
              </a>
            </div>
          </div>

          <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-200 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
        </div>
      </header>

      <main>
        <!-- Hero section -->
        <div class="relative">
          <div class="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2"></div>
          <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div class="absolute inset-0">
                <img
                  class="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                  alt="People working on laptops"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-r from-yellow-900 to-indigo-700 mix-blend-multiply"
                ></div>
              </div>
              <div
                class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8"
              >
                <h1
                  class="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl"
                >
                  <span class="block text-yellow-700">
                    Visitor covid-19 pre screening form</span
                  >
                </h1>
                <p
                  class="max-w-lg mx-auto mt-6 text-xl text-center text-indigo-200 sm:max-w-3xl"
                >
                  In order to prevent the spread of the Coronavirus and reduce
                  the potential risk of exposure to our personnel, we are asking
                  all visitors to our offices to complete and submit this
                  questionnaire prior to entering our offices.
                </p>
                <div
                  class="max-w-sm mx-auto mt-10 sm:max-w-none sm:flex sm:justify-center"
                >
                  <div
                    class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5"
                  >
                    <nuxt-link
                      to="/registration"
                      class="flex items-center justify-center px-4 py-3 text-base font-medium text-yellow-700 bg-white border border-transparent rounded-md shadow-sm hover:bg-indigo-50 sm:px-8"
                    >
                      Get started
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
