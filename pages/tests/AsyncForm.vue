<template>
  <div>
    <FirestoreAsyncSingle
      :path="`AppDetails/${authUser.id}/LivingDetailsInfo/${application.id}`"
      tableId="livingCircumstances"
    >
      <template
        v-slot:default="{
          pending,
          errorMsg,
          data,
          getRecord,
          addRecord,
          deleteRecord,
          updateRecord,
          getFields
        }"
      >
        <div>
          <div class="formbg">
            <div class="w-full mx-auto sm:max-w-full lg:mx-auto">
              <h2 class="hmain">Living circumstances</h2>
              <h3 v-if="pending">Loading data....</h3>
              <h3 class="text-red-800" v-if="!application.id">
                Please <nuxt-link to="/applications">select</nuxt-link> an
                application or
                <nuxt-link to="/apply">Apply for a new</nuxt-link>
              </h3>
              <ValidationObserver v-slot="{ handleSubmit }">
                <div class="formSpace">
                  <form
                    @submit.prevent="
                      handleSubmit(r => {
                        updateRecord(data);
                      })
                    "
                    method="POST"
                    class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                  >
                    <div class="sm:col-span-2">
                      <div class="mt-1">
                        <ValidationProvider
                          name="Own or Rent"
                          rules="excluded:invalid"
                          v-slot="{ errors }"
                        >
                          <select
                            id="place"
                            name="place"
                            autocomplete="place"
                            v-model="data.place"
                            class="inputfields"
                          >
                            <option value="invalid" selected>
                              Do you own or rent a house?
                            </option>
                            <option value="own">Own</option>
                            <option value="rent">Rent</option>
                          </select>
                          <span class="text-red-600">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                    <div class="sm:col-span-2">
                      <div class="mt-2">
                        <select
                          id="staying"
                          name="staying"
                          autocomplete="staying"
                          v-model="data.staying"
                          class="inputfields"
                        >
                          <option value="" selected>
                            Do you live on your own or with a partner or with
                            your parent(s)?
                          </option>
                          <option value="own">Own</option>
                          <option value="partner">Partner</option>
                          <option value="parents">Parents</option>
                        </select>
                      </div>
                    </div>
                    <div class="sm:col-span-2">
                      <div class="mt-2">
                        <select
                          id="travel"
                          name="gender"
                          autocomplete="travel"
                          v-model="data.travel"
                          class="inputfields"
                        >
                          <option value="" selected>
                            How do you travel to work?
                          </option>
                          <option value="walk">Walk</option>
                          <option value="taxi">Taxi</option>
                          <option value="lift club">Lift club</option>
                          <option value="own car">Own car</option>
                          <option value="bus">Bus</option>
                        </select>
                      </div>
                    </div>
                    <!-- This example requires Tailwind CSS v2.0+ -->
                    <nav
                      class="flex items-center justify-between px-4 border-gray-200 sm:px-0"
                    >
                      <div class="flex flex-1 w-0 -mt-px"></div>
                      <div class="hidden md:-mt-px md:flex">
                        <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-green-900 hover:text-gray-700 hover:border-gray-300" -->
                      </div>
                      <div class="flex justify-end flex-1 w-0 -mt-px"></div>
                    </nav>
                    <button
                      v-if="application.id"
                      class="inline-flex items-center justify-center px-6 py-4 m-6 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </ValidationObserver>
            </div>
          </div>
          <pre>{{ data }}</pre>
        </div>
      </template>
    </FirestoreAsyncSingle>
    <pre>{{ application }}</pre>
  </div>
</template>

<script>
import FirestoreAsyncSingle from "~/components/scd/FirestoreAsyncSingle";
import { mapState } from "vuex";
export default {
  middleware: "authenticated",
  components: {
    FirestoreAsyncSingle
  },
  computed: {
    ...mapState("applicationStore", ["application"]),
    ...mapState(["authUser"])
  }
};
</script>

<style></style>
