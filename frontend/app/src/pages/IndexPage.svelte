<script lang="typescript">
import LogoMarketing from "@app/components/LogoMarketing.svelte";


</script>
<!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
<div class="bg-gray-50">
  <div class="relative overflow-hidden">
    <div class="block absolute inset-y-0 h-full w-full">
      <div class="relative h-full">
        <svg
          class="absolute right-full transform translate-y-1/3 translate-x-1/4
            md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784">
          <defs>
            <pattern
              id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse">
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#ad9a0a02-b58e-4a1d-8c36-1b649889af63)" />
        </svg>
        <svg
          class="absolute left-full transform -translate-y-3/4 -translate-x-1/4
            sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784">
          <defs>
            <pattern
              id="d2a68204-c383-44b1-b99f-42ccff4e5365"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse">
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#478e97d6-90df-4a89-8d63-30fdbb3c7e57)" />
        </svg>
      </div>
    </div>

    <div class="relative pt-6 pb-12 lg:pb-20">
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6">
        <nav
          class="relative flex items-center justify-between sm:h-10
            md:justify-center">
          <div
            class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div class="flex items-center justify-between w-full md:w-auto">
              <a href="#" aria-label="Home" class="mt-15">
                <LogoMarketing/>
              </a>
              <div class="-mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md
                    text-gray-400 hover:text-gray-500 hover:bg-gray-100
                    focus:outline-none focus:bg-gray-100 focus:text-gray-500
                    transition duration-150 ease-in-out"
                  id="main-menu"
                  aria-label="Main menu"
                  aria-haspopup="true">
                  <svg
                    class="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="hidden md:flex md:space-x-10">
            <a
              href="#"
              class="font-medium text-gray-500 hover:text-gray-900 transition
                duration-150 ease-in-out">Product</a>
            <a
              href="#"
              class="font-medium text-gray-500 hover:text-gray-900 transition
                duration-150 ease-in-out">Features</a>
            <a
              href="#"
              class="font-medium text-gray-500 hover:text-gray-900 transition
                duration-150 ease-in-out">Marketplace</a>
            <a
              href="#"
              class="font-medium text-gray-500 hover:text-gray-900 transition
                duration-150 ease-in-out">Company</a>
          </div>
          <div
            class="hidden md:absolute md:flex md:items-center md:justify-end
              md:inset-y-0 md:right-0">
            <span class="inline-flex rounded-md shadow">
              <a
                href="#"
                class="inline-flex items-center px-4 py-2 border
                  border-transparent text-base leading-6 font-medium rounded-md
                  text-indigo-600 bg-white hover:text-indigo-500
                  focus:outline-none focus:border-indigo-300
                  focus:shadow-outline-indigo active:bg-gray-50
                  active:text-indigo-700 transition duration-150 ease-in-out">
                Log in
              </a>
            </span>
          </div>
        </nav>
      </div>

      <!--
          Mobile menu, show/hide based on menu open state.
  
          Entering: "duration-150 ease-out"
            From: "opacity-0 scale-95"
            To: "opacity-100 scale-100"
          Leaving: "duration-100 ease-in"
            From: "opacity-100 scale-100"
            To: "opacity-0 scale-95"
        -->
      <div
        class="absolute top-0 inset-x-0 p-2 transition transform
          origin-top-right md:hidden">
        <div class="rounded-lg shadow-md">
          <div
            class="rounded-lg bg-white shadow-xs overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="main-menu">
            <div class="px-5 pt-4 flex items-center justify-between">
              <div>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                  alt="" />
              </div>
              <div class="-mr-2">
                <button
                  type="button"
                  class="inline-flex items-center justify-center p-2 rounded-md
                    text-gray-400 hover:text-gray-500 hover:bg-gray-100
                    focus:outline-none focus:bg-gray-100 focus:text-gray-500
                    transition duration-150 ease-in-out"
                  aria-label="Close menu">
                  <svg
                    class="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="px-2 pt-2 pb-3">
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium
                  text-gray-700 hover:text-gray-900 hover:bg-gray-50
                  focus:outline-none focus:text-gray-900 focus:bg-gray-50
                  transition duration-150 ease-in-out"
                role="menuitem">Product</a>
              <a
                href="#"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium
                  text-gray-700 hover:text-gray-900 hover:bg-gray-50
                  focus:outline-none focus:text-gray-900 focus:bg-gray-50
                  transition duration-150 ease-in-out"
                role="menuitem">Features</a>
              <a
                href="#"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium
                  text-gray-700 hover:text-gray-900 hover:bg-gray-50
                  focus:outline-none focus:text-gray-900 focus:bg-gray-50
                  transition duration-150 ease-in-out"
                role="menuitem">Marketplace</a>
              <a
                href="#"
                class="mt-1 block px-3 py-2 rounded-md text-base font-medium
                  text-gray-700 hover:text-gray-900 hover:bg-gray-50
                  focus:outline-none focus:text-gray-900 focus:bg-gray-50
                  transition duration-150 ease-in-out"
                role="menuitem">Company</a>
            </div>
            <div>
              <a
                href="#"
                class="block w-full px-5 py-3 text-center font-medium
                  text-indigo-600 bg-gray-50 hover:bg-gray-100
                  hover:text-indigo-700 focus:outline-none focus:bg-gray-100
                  focus:text-indigo-700 transition duration-150 ease-in-out"
                role="menuitem">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 mx-auto max-w-screen-xl px-4 sm:px-6 md:mt-16 lg:mt-20">
        <div class="text-center">
          <h2
            class="text-4xl tracking-tight leading-10 font-extrabold
              text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            simple, <br />
            <span class="text-indigo-600">dynamic forms</span>
          </h2>
          <p
            class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg
              md:mt-5 md:text-xl md:max-w-3xl">
            Powerful easy to use dynamic forms to enhance your business
          </p>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="absolute inset-0 flex flex-col">
        <div class="flex-1" />
        <div class="flex-1 w-full bg-gray-800" />
      </div>
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6">
        <img
          class="relative rounded-lg shadow-lg"
          src="/builder.png"
          alt="App screenshot" />
      </div>
    </div>
  </div>
  <div class="bg-gray-800">
    <div
      class="max-w-screen-xl mx-auto pt-16 pb-20 px-4 sm:px-6 md:pb-24 lg:px-8">
      <h3
        class="text-center text-gray-400 text-sm font-semibold uppercase
          tracking-wide">
        Trusted by over 26,000 forward-thinking companies
      </h3>
      <div class="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
        <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
          <img
            class="h-12"
            src="https://tailwindui.com/img/logos/tuple-logo.svg"
            alt="Tuple" />
        </div>
        <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
          <img
            class="h-12"
            src="https://tailwindui.com/img/logos/mirage-logo.svg"
            alt="Mirage" />
        </div>
        <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
          <img
            class="h-12"
            src="https://tailwindui.com/img/logos/statickit-logo.svg"
            alt="StaticKit" />
        </div>
        <div class="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
          <img
            class="h-12"
            src="https://tailwindui.com/img/logos/transistor-logo.svg"
            alt="Transistor" />
        </div>
        <div class="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
          <img
            class="h-12"
            src="https://tailwindui.com/img/logos/workcation-logo.svg"
            alt="Workcation" />
        </div>
      </div>
    </div>
  </div>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
<div class="bg-gray-50 overflow-hidden">
    <div class="relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <svg class="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784">
        <defs>
          <pattern id="8b1b5f72-e944-4457-af67-0c6d15a99f38" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="784" fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)" />
      </svg>
  
      <div class="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div class="lg:col-span-1">
          <h3 class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            A better way to send money.
          </h3>
        </div>
        <div class="mt-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:col-span-2 lg:mt-0">
          <div>
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <!-- Heroicon name: globe-alt -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div class="mt-5">
              <h4 class="text-lg leading-6 font-medium text-gray-900">Competitive rates</h4>
              <p class="mt-2 text-base leading-6 text-gray-500">
                Consequuntur omnis dicta cumque, inventore atque ab dolores aspernatur tempora ab doloremque.
              </p>
            </div>
          </div>
          <div class="mt-10 sm:mt-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <!-- Heroicon name: scale -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div class="mt-5">
              <h4 class="text-lg leading-6 font-medium text-gray-900">No hidden fees</h4>
              <p class="mt-2 text-base leading-6 text-gray-500">
                Corporis quisquam nostrum nulla veniam recusandae temporibus aperiam officia incidunt at distinctio ratione.
              </p>
            </div>
          </div>
          <div class="mt-10 sm:mt-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <!-- Heroicon name: lightning-bolt -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="mt-5">
              <h4 class="text-lg leading-6 font-medium text-gray-900">Instant transfers</h4>
              <p class="mt-2 text-base leading-6 text-gray-500">
                Omnis, illo delectus? Libero, possimus nulla nemo tenetur adipisci repellat dolore eligendi velit doloribus mollitia.
              </p>
            </div>
          </div>
          <div class="mt-10 sm:mt-0">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <!-- Heroicon name: mail -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="mt-5">
              <h4 class="text-lg leading-6 font-medium text-gray-900">Reminder emails</h4>
              <p class="mt-2 text-base leading-6 text-gray-500">
                Veniam necessitatibus reiciendis fugit explicabo dolorem nihil et omnis assumenda odit? Quisquam unde accusantium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
