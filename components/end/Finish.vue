<template>
  <div>
    <!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:


  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }

-->
    <div class="relative ">
      <div class="mt-10 border-green-900 formbg border-Collapse">
        <div class="w-full mx-auto sm:max-w-full lg:mx-auto">
          <h2
            class="mt-6 text-4xl font-extrabold tracking-tight text-center text-yellow-600 "
          >
            Thank you for your patients
          </h2>
          <h3
            class="mt-4 text-xl font-medium tracking-tight text-center text-gray-500 sm:text-2xl"
          >
            Your covid-19 vistor pre-screening information has been submited
          </h3>
          <h1 class="mt-3 text-center">
            <button
              class="inline-flex items-end justify-center px-6 py-3 mt-6 text-base font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 justify-content-end"
              @click="goToNext"
            >
              OK
            </button>
          </h1>
        </div>

        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToNext() {
      this.$router.push("/");
    }
  }
};
</script>
