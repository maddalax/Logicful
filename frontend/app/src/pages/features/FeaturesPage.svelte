<script lang="typescript">
  import AlphaBanner from "@app/components/AlphaBanner.svelte";
  import MarketingNavbar from "@app/components/layout/MarketingNavbar.svelte";
  import BuildSvg from "./BuildSvg.svelte";
  import MobileSvg from "./MobileSvg.svelte";
  import ShareSvg from "./ShareSvg.svelte";
  import WorkflowSvg from "./WorkflowSvg.svelte";
</script>

<AlphaBanner />
<div class="bg-white">
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

    <div class="relative pt-6 pb-6 lg:pb-6">
      <MarketingNavbar />
    </div>
  </div>

  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <!-- This component requires Tailwind CSS >= 1.5.1 and @tailwindcss/ui >= 0.4.0 -->

  <div class="py-16 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-base max-w-prose mx-auto lg:max-w-none" />

      <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
        <div class="relative z-10 mb-12 lg:mb-0">
          <div class="mb-10 prose text-gray-500 mx-auto lg:max-w-none">
            <p
              class="text-base leading-6 text-indigo-600 font-semibold
                tracking-wide uppercase">
              Logicful Forms
            </p>
            <h1
              class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10">
              Easy to build, share, and integrate
            </h1>

            <p class="text-lg text-gray-500 leading-7">
              Logicful makes it possible to build no-code, online forms with our
              easy-to-use online form builder and advanced features. Gather
              customer data and automate tasks in just a few clicks. Data
              collection and management has never been this easy.
            </p>
          </div>
          <div class="flex text-base max-w-prose mx-auto lg:max-w-none">
            <div class="rounded-md shadow">
              <a
                href="form/builder?formId=demo"
                class="w-full flex items-center justify-center px-5 py-3 border
                  border-transparent text-base leading-6 font-medium rounded-md
                  text-white bg-indigo-600 hover:bg-indigo-500
                  focus:outline-none focus:border-indigo-700
                  focus:shadow-outline-indigo transition duration-150
                  ease-in-out">
                Try demo
              </a>
            </div>
            <div class="rounded-md shadow ml-4">
              <a
                href="account/register"
                class="w-full flex items-center justify-center px-5 py-3 border
                  border-transparent text-base leading-6 font-medium rounded-md
                  text-indigo-600 bg-white hover:text-indigo-500
                  focus:outline-none focus:border-indigo-300
                  focus:shadow-outline-indigo transition duration-150
                  ease-in-out">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div class="relative text-base max-w-prose mx-auto lg:max-w-none">
          <div class="relative rounded-t-lg px-6 py-8 sm:px-10 sm:pb-8">
            <div class="flex-shrink-0">
              <img class="" src="/assets/builder.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white overflow-hidden">
    <div class="relative max-w-7xl mx-auto py-0 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="relative mb-8 lg:mb-0 lg:row-start-1 lg:col-start-2">
          <div class="relative text-base mx-auto max-w-prose lg:max-w-none">
            <figure>
              <div class="relative lg:pb-0 pl-24 pt-7">
                <BuildSvg />
              </div>
            </figure>
          </div>
        </div>
        <div>
          <div class="mx-auto text-base max-w-prose lg:max-w-none">
            <p
              class="text-base leading-6 text-indigo-600 font-semibold
                tracking-wide uppercase">
              Useability
            </p>
            <h1
              class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10">
              Easy to use drag and drop builder
            </h1>
          </div>
          <div class="text-base max-w-prose mx-auto lg:max-w-none">
            <p class="text-lg leading-7 text-gray-500 mb-5">
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
              urna sed consectetur neque tristique pellentesque. Blandit amet,
              sed aenean erat arcu morbi.
            </p>
          </div>
          <div
            class="prose text-gray-500 mx-auto lg:max-w-none lg:row-start-1
              lg:col-start-1">
            <p>
              Sollicitudin tristique eros erat odio sed vitae, consequat turpis
              elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu
              viverra donec ut volutpat donec laoreet quam urna.
            </p>
            <p>
              Bibendum eu nulla feugiat justo, elit adipiscing. Ut tristique sit
              nisi lorem pulvinar. Urna, laoreet fusce nibh leo. Dictum et et et
              sit. Faucibus sed non gravida lectus dignissim imperdiet a.
            </p>
            <p>
              Dictum magnis risus phasellus vitae quam morbi. Quis lorem lorem
              arcu, metus, egestas netus cursus. In.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white overflow-hidden">
    <div class="relative max-w-7xl mx-auto py-0 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="relative mb-8 lg:mb-0 lg:row-start-1 lg:col-start-1">
          <div
            class="relative text-base mx-auto max-w-prose lg:max-w-none pl-10">
            <figure>
              <div class="relative lg:pb-0 pr-20 mt-10 lg:mt-20">
                <ShareSvg />
              </div>
            </figure>
          </div>
        </div>
        <div>
          <div class="mx-auto text-base max-w-prose lg:max-w-none">
            <p
              class="text-base leading-6 text-indigo-600 font-semibold
                tracking-wide uppercase">
              Shareable
            </p>
            <h1
              class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10">
              Sharing made easy
            </h1>
          </div>
          <div class="text-base max-w-prose mx-auto lg:max-w-none">
            <p class="text-lg leading-7 text-gray-500 mb-5">
              Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
              urna sed consectetur neque tristique pellentesque. Blandit amet,
              sed aenean erat arcu morbi.
            </p>
          </div>
          <div
            class="prose text-gray-500 mx-auto lg:max-w-none lg:row-start-2
              lg:col-start-2">
            <p>
              Sollicitudin tristique eros erat odio sed vitae, consequat turpis
              elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu
              viverra donec ut volutpat donec laoreet quam urna.
            </p>
            <p>
              Bibendum eu nulla feugiat justo, elit adipiscing. Ut tristique sit
              nisi lorem pulvinar. Urna, laoreet fusce nibh leo. Dictum et et et
              sit. Faucibus sed non gravida lectus dignissim imperdiet a.
            </p>
            <p>
              Dictum magnis risus phasellus vitae quam morbi. Quis lorem lorem
              arcu, metus, egestas netus cursus. In.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white overflow-hidden">
    <div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="relative mb-8 lg:mb-0 lg:row-start-1 lg:col-start-2">
        
          <div class="relative text-base mx-auto max-w-prose lg:max-w-none">
            <figure>
              <div class="relative lg:pb-0 mt-10 lg:mt-32 pl-10">
                <WorkflowSvg />
              </div>
            </figure>
          </div>
        </div>
        <div>
          <div class="mx-auto text-base max-w-prose lg:max-w-none">
            <p
              class="text-base leading-6 text-indigo-600 font-semibold
                tracking-wide uppercase">
              Workflows
            </p>
            <h1
              class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10">
              From sending email noticifations to integrating with your
              pre-existing workflows
            </h1>
          </div>
          <div>
          <div
            class="prose text-gray-500 mx-auto lg:max-w-none lg:row-start-1
              lg:col-start-1">
            <p>
              Sollicitudin tristique eros erat odio sed vitae, consequat turpis
              elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu
              viverra donec ut volutpat donec laoreet quam urna.
            </p>
            <p>
              Bibendum eu nulla feugiat justo, elit adipiscing. Ut tristique sit
              nisi lorem pulvinar. Urna, laoreet fusce nibh leo. Dictum et et et
              sit. Faucibus sed non gravida lectus dignissim imperdiet a.
            </p>
          </div>


            <div class="rounded-md shadow mt-5 w-40 text-white md:mx-auto lg:ml-0">
              <a
                href="form/builder?formId=demo"
                class="text-white  flex items-center justify-center px-5 py-3 border
                  border-transparent text-base leading-6 font-medium rounded-md
                   bg-indigo-600 hover:bg-indigo-500 focus:outline-none
                  focus:border-indigo-700 focus:shadow-outline-indigo transition
                  duration-150 ease-in-out">
                Learn More
              </a>
          </div>

          </div>     
        </div>
      </div>
    </div>
  </div>

  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div
    class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28
      lg:px-8">
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h2
          class="text-3xl leading-9 tracking-tight font-extrabold text-gray-900
            sm:text-4xl sm:leading-10">
          Other Logicful Features
        </h2>
        <p
          class="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero
          labore natus atque, ducimus sed.
        </p>
      </div>
      <div
        class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
        <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div class="flex-shrink-0 pl-4">
            <div class="flex-1 bg-white p-6 flex justify-between">
              <div class="flex-col mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  height="70"
                  width="70">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div class="flex-1 flex-col pl-6">
                <a href="#" class="block">
                  <h3
                    class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                    Teams
                  </h3>
                  <p class="mt-3 text-base leading-6 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto accusantium praesentium eius, ut atque fuga
                    culpa, similique sequi cum eos quis dolorum.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div class="flex-shrink-0 pl-4">
            <div class="flex-1 bg-white p-6 flex justify-between">
              <div class="flex-col mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  height="70"
                  width="70">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div class="flex-1 flex-col pl-6">
                <a href="#" class="block">
                  <h3
                    class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                    Submissions in Raw Json
                  </h3>
                  <p class="mt-3 text-base leading-6 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto accusantium praesentium eius, ut atque fuga
                    culpa, similique sequi cum eos quis dolorum.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div class="flex-shrink-0 pl-4">
            <div class="flex-1 bg-white p-6 flex justify-between">
              <div class="flex-col mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  height="70"
                  width="70">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1 flex-col pl-6">
                <a href="#" class="block">
                  <h3
                    class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                    Mobile Friendly Forms
                  </h3>
                  <p class="mt-3 text-base leading-6 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Architecto accusantium praesentium eius, ut atque fuga
                    culpa, similique sequi cum eos quis dolorum.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

       
      </div>
      <div
      class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
      <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="flex-shrink-0 pl-4">
          <div class="flex-1 bg-white p-6 flex justify-between">
            <div class="flex-col mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="70"
                width="70">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div class="flex-1 flex-col pl-6">
              <a href="#" class="block">
                <h3
                  class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                  Conditional Fields
                </h3>
                <p class="mt-3 text-base leading-6 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto accusantium praesentium eius, ut atque fuga
                  culpa, similique sequi cum eos quis dolorum.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="flex-shrink-0 pl-4">
          <div class="flex-1 bg-white p-6 flex justify-between">
            <div class="flex-col mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="70"
                width="70">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div class="flex-1 flex-col pl-6">
              <a href="#" class="block">
                <h3
                  class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                  File upload inputs
                </h3>
                <p class="mt-3 text-base leading-6 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto accusantium praesentium eius, ut atque fuga
                  culpa, similique sequi cum eos quis dolorum.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="flex-shrink-0 pl-4">
          <div class="flex-1 bg-white p-6 flex justify-between">
            <div class="flex-col mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                height="70"
                width="70">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="flex-1 flex-col pl-6">
              <a href="#" class="block">
                <h3
                  class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                  Confirmation Emails
                </h3>
                <p class="mt-3 text-base leading-6 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto accusantium praesentium eius, ut atque fuga
                  culpa, similique sequi cum eos quis dolorum.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>




      

     
    </div>
    
    <div
    class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div class="flex-shrink-0 pl-4">
        <div class="flex-1 bg-white p-6 flex justify-between">
          <div class="flex-col mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="70"
              width="70">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <div class="flex-1 flex-col pl-6">
            <a href="#" class="block">
              <h3
                class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                Custom Redirects and Confirmation Pages
              </h3>
              <p class="mt-3 text-base leading-6 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto accusantium praesentium eius, ut atque fuga
                culpa, similique sequi cum eos quis dolorum.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div class="flex-shrink-0 pl-4">
        <div class="flex-1 bg-white p-6 flex justify-between">
          <div class="flex-col mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="70"
              width="70">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div class="flex-1 flex-col pl-6">
            <a href="#" class="block">
              <h3
                class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                Submission Viewer
              </h3>
              <p class="mt-3 text-base leading-6 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto accusantium praesentium eius, ut atque fuga
                culpa, similique sequi cum eos quis dolorum.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div class="flex-shrink-0 pl-4">
        <div class="flex-1 bg-white p-6 flex justify-between">
          <div class="flex-col mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height="70"
              width="70">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="flex-1 flex-col pl-6">
            <a href="#" class="block">
              <h3
                class="mt-2 text-xl leading-7 font-semibold text-indigo-600">
                Form Rules
              </h3>
              <p class="mt-3 text-base leading-6 text-gray-500">
                Form ability time frames
                Trigger actions upon submissions
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    </div>
  </div>
</div>
