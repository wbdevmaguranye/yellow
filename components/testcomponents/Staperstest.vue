<template>
  <div class="">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav aria-label="Progress">
      <ol
        class="flex-wrap border border-gray-300 divide-y divide-gray-300 rounded-md md:flex md:divide-y-0"
      >
        <!-- im testing this on all stepper starting from here -->
        <li class="relative md:flex-1 md:flex" v-if="getPersonalInfo">
          <!-- Upcoming Step -->
          <NuxtLink
            to="/personal"
            class="flex items-center group hover:bg-green-400"
          >
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
              >
                <span class="text-gray-900">01</span>
              </span>
              <span class="ml-2 text-xs text-gray-900 font-small"
                >Personal Information</span
              >
              <span>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="23"
                  height="23"
                >
                  <path
                    d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                  />
                </svg>
              </span>
            </span>
          </NuxtLink>
          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <!-- im ending the test here for a tick -->
        <li class="relative md:flex-1 md:flex" v-else-if="!getPersonalInfo">
          <!-- Upcoming Step -->
          <NuxtLink
            to="/personal"
            class="flex items-center group hover:bg-green-400"
          >
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
              >
                <span class="text-gray-900">01</span>
              </span>
              <span class="ml-2 text-xs text-gray-900 font-small"
                >Personal Information</span
              >
              <span>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="23"
                  height="23"
                >
                  <path
                    d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                  />
                </svg>
              </span>
            </span>
          </NuxtLink>
          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <!-- employement stepper starts here -->
        <!-- im testing this on all stepper starting from here -->
        <li class="relative md:flex-1 md:flex" v-if="getEmploymentInfo">
          <!-- Upcoming Step -->
          <NuxtLink
            to="/employment"
            class="flex items-center group hover:bg-green-400"
          >
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
              >
                <span class="text-gray-900">02</span>
              </span>
              <span class="ml-2 text-xs text-gray-900 font-small"
                >Employment Information</span
              >
              <span>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="23"
                  height="23"
                >
                  <path
                    d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                  />
                </svg>
              </span>
            </span>
          </NuxtLink>
          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <!-- im ending the test here for a tick -->
        <li class="relative md:flex-1 md:flex" v-else-if="!getEmploymentInfo">
          <!-- Upcoming Step -->
          <NuxtLink
            to="/employment"
            class="flex items-center group hover:bg-green-400"
          >
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
              >
                <span class="text-gray-900">02</span>
              </span>
              <span class="ml-2 text-xs text-gray-900 font-small"
                >Employment Information</span
              >
              <span>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="23"
                  height="23"
                >
                  <path
                    d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                  />
                </svg>
              </span>
            </span>
          </NuxtLink>
          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <!-- employment stepper ends here -->
        <li class="relative md:flex-1 md:flex">
          <!-- Current Step -->
          <NuxtLink
            to="/nextofkin"
            class="flex items-center px-6 py-4 text-sm font-sm hover:bg-green-400"
            aria-current="step"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
            >
              <span class="text-gray-900">03</span>
            </span>
            <span class="ml-2 text-xs text-gray-900 font-small"
              >Next of Kin Information</span
            >
            <span v-show="getNextofkinInfo">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                />
              </svg>
            </span>
            <span v-show="!getNextofkinInfo"
              ><svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                /></svg
            ></span>
          </NuxtLink>

          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <li class="relative md:flex-1 md:flex">
          <!-- Current Step -->
          <NuxtLink
            to="/banking"
            class="flex items-center px-6 py-4 text-sm font-sm hover:bg-green-400"
            aria-current="step"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
            >
              <span class="text-gray-900">04</span>
            </span>
            <span class="ml-2 text-xs text-gray-900 font-small"
              >Banking Information</span
            >
            <span v-show="getBankingInfo">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                />
              </svg>
            </span>
            <span v-show="!getBankingInfo"
              ><svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                /></svg
            ></span>
          </NuxtLink>

          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <li class="relative md:flex-1 md:flex">
          <!-- Current Step -->
          <NuxtLink
            to="/loan"
            class="flex items-center px-6 py-4 text-sm font-sm hover:bg-green-400"
            aria-current="step"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
            >
              <span class="text-gray-900">05</span>
            </span>
            <span class="ml-2 text-xs text-gray-900 font-small"
              >Loan Information</span
            >
            <span v-show="getloanInfo">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                />
              </svg>
            </span>
            <span v-show="!getloanInfo"
              ><svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                /></svg
            ></span>
          </NuxtLink>

          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <li class="relative md:flex-1 md:flex">
          <!-- Current Step -->
          <NuxtLink
            to="/expenditure"
            class="flex items-center px-6 py-4 text-sm font-sm hover:bg-green-400"
            aria-current="step"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
            >
              <span class="text-gray-900">06</span>
            </span>
            <span class="ml-2 text-xs text-gray-900 font-small"
              >Income/Expenditure Information</span
            >
            <span v-show="getExpenditureInfo">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                />
              </svg>
            </span>
            <span v-show="!getExpenditureInfo"
              ><svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                /></svg
            ></span>
          </NuxtLink>

          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>

        <li class="relative md:flex-1 md:flex">
          <!-- Current Step -->
          <NuxtLink
            to="/dependant"
            class="flex items-center px-6 py-4 text-sm font-sm hover:bg-green-400"
            aria-current="step"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
            >
              <span class="text-gray-900">07</span>
            </span>
            <span class="ml-2 text-xs text-gray-900 font-small"
              >Depandants Information</span
            >
            <span v-show="getDependentsInfo">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                />
              </svg>
            </span>
            <span v-show="!getDependentsInfo"
              >{{ getDependentsInfo
              }}<svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                /></svg
            ></span>
          </NuxtLink>

          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <li class="relative md:flex-1 md:flex" v-if="this.loaded">
          <NuxtLink
            to="/living"
            class="flex items-center px-6 py-4 text-sm font-sm hover:bg-green-400"
            aria-current="step"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
            >
              <span class="text-gray-900">08</span>
            </span>
            <span class="ml-2 text-xs text-gray-900 font-small"
              >Living circumstances</span
            >
            <span v-show="getlivingInfo">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                />
              </svg>
            </span>
            <span v-show="!getlivingInfo"
              ><svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                /></svg
            ></span>
          </NuxtLink>

          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <li class="relative md:flex-1 md:flex">
          <!-- Current Step -->
          <NuxtLink
            to="/upload"
            class="flex items-center px-6 py-4 text-sm font-sm hover:bg-green-400"
            aria-current="step"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
            >
              <span class="text-gray-900">09</span>
            </span>
            <span class="ml-2 text-xs text-gray-900 font-small"
              >Upload Documents</span
            >
            <span v-show="ifUploadedDocumentIsComplete">
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                />
              </svg>
            </span>
            <span v-show="!ifUploadedDocumentIsComplete"
              ><svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="23"
                height="23"
              >
                <path
                  d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                /></svg
            ></span>
          </NuxtLink>

          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <!-- im testing this on all stepper starting from here -->
        <li class="relative md:flex-1 md:flex" v-if="isAllComplete">
          <!-- Upcoming Step -->
          <NuxtLink
            to="/finish"
            class="flex items-center group hover:bg-green-400"
          >
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
              >
                <span class="text-gray-900">10</span>
              </span>
              <span class="ml-2 text-xs text-gray-900 font-small">Finish</span>
              <span>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="23"
                  height="23"
                >
                  <path
                    d="M 24 4 C 12.972 4 4 12.972 4 24 C 4 35.028 12.972 44 24 44 C 35.028 44 44 35.028 44 24 C 44 20.791 43.222047 17.767172 41.873047 15.076172 L 39.628906 17.320312 C 40.508906 19.371312 41 21.629 41 24 C 41 33.374 33.374 41 24 41 C 14.626 41 7 33.374 7 24 C 7 14.626 14.626 7 24 7 C 28.446 7 32.485578 8.7292031 35.517578 11.533203 L 37.638672 9.4121094 C 34.061672 6.0651094 29.273 4 24 4 z M 39.470703 10.986328 A 1.50015 1.50015 0 0 0 38.439453 11.439453 L 21.5 28.378906 L 17.560547 24.439453 A 1.50015 1.50015 0 1 0 15.439453 26.560547 L 20.439453 31.560547 A 1.50015 1.50015 0 0 0 22.560547 31.560547 L 40.560547 13.560547 A 1.50015 1.50015 0 0 0 39.470703 10.986328 z"
                  />
                </svg>
              </span>
            </span>
          </NuxtLink>
          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
        <!-- im ending the test here for a tick -->
        <li class="relative md:flex-1 md:flex" v-else-if="!isAllComplete">
          <!-- Upcoming Step -->
          <NuxtLink
            to="/personal"
            class="flex items-center group hover:bg-green-400"
          >
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span
                class="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green-600 rounded-full "
              >
                <span class="text-gray-900">10</span>
              </span>
              <span class="ml-2 text-xs text-gray-900 font-small">Finish</span>
              <span>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="23"
                  height="23"
                >
                  <path
                    d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z"
                  />
                </svg>
              </span>
              <p class="ml-2 text-xs text-green-500">
                Complete all forms to continue
              </p>
            </span>
          </NuxtLink>
          <!-- Arrow separator for lg screens and up -->
          <div
            class="absolute top-0 right-0 hidden w-5 h-full md:block"
            aria-hidden="true"
          >
            <svg
              class="w-full h-full text-gray-300"
              viewBox="0 0 22 80"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 -2L20 40L0 82"
                vector-effect="non-scaling-stroke"
                stroke="currentcolor"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("applicationStore", ["getPersonalInfo"]),
    ...mapGetters("applicationStore", ["getBankingInfo"]),
    ...mapGetters("applicationStore", ["getNextofkinInfo"]),
    ...mapGetters("applicationStore", ["getEmploymentInfo"]),
    ...mapGetters("applicationStore", ["getloanInfo"]),
    ...mapGetters("applicationStore", ["getExpenditureInfo"]),
    ...mapGetters("applicationStore", ["getDependentsInfo"]),
    ...mapGetters("applicationStore", ["getlivingInfo"]),
    ...mapGetters("applicationStore", ["getDocs"]),
    ...mapGetters("applicationStore", ["ifLivingCircustancesisComplete"]),

    ...mapGetters("applicationStore", ["ifUploadedDocumentIsComplete"]),
    ...mapGetters("applicationStore", ["isAllComplete"])
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
