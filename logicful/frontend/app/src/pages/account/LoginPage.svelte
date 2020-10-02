<script lang="typescript">
  import { postApi } from "@app/services/ApiService";
  import { setToken } from "@app/services/AuthService";
  import { afterUpdate, onMount } from "svelte";
  import type { UserToken } from "@app/services/AuthService";
  import LogoDark from "@app/components/layout/logos/LogoDark.svelte";
  import Link from "@app/components/Link.svelte";
  import { navigate } from "svelte-routing";
  import Button from "@app/components/Button.svelte";

  let email = "";
  let password = "";
  let remember = true;
  let valid = false;
  let showPassword = false;
  let processing = false;
  let error = "";
  let processingGoogle = false;
  let googleIdToken = "";

  onMount(() => {
    //@ts-ignore
    window.onGoogleSignIn = (user: any) => {
      processingGoogle = true;
      const idToken = user.getAuthResponse().id_token;
      googleIdToken = idToken;
      onGoogleLogin();
    };
  });

  async function onGoogleLogin() {
    await doLogin("user/login/google", {
      token: googleIdToken,
    });
  }

  async function onLogin() {
    error = "";
    processing = true;
    email = email.trim().toLowerCase();
    await doLogin("user/login", {
      email,
      password,
    });
  }

  async function doLogin(endpoint: string, body: any) {
    try {
      const result = await postApi<UserToken>(endpoint, body);
      if (result.token) {
        setToken(result, remember);
        window.location.replace("/");
      } else {
        error = "Failed to login, unknown response from server.";
      }
    } catch (ex) {
      if (ex.message === "invalid username or password") {
        error = "Invalid username or password.";
      } else {
        error = "Failed to login, something went wrong.";
      }
    } finally {
      processing = false;
    }
  }

  afterUpdate(() => {
    valid = isValid();
  });

  function isValid(): boolean {
    return email != "" && password != "";
  }

  function togglePassword() {
    showPassword = !showPassword;
  }
</script>

<style>
  :global(input:required) {
    box-shadow: none;
  }
 
</style>

<svelte:head>
  <meta
    name="google-signin-client_id"
    content="807768276065-c8b2jvlks20jgm0mk3t2akfm7pc3jomu.apps.googleusercontent.com" />
  <script src="https://apis.google.com/js/platform.js" async defer>
  </script>
</svelte:head>

<div
  class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6
    lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
      alt="Workflow" />
    <h2
      class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
      Sign in to our platform
    </h2>
    <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
      Or
      <a href="/account/register" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
        Create an account
      </a>
    </p>
  </div>

  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    {#if error}
      <div class="inset-x-0 pt-2 mb-3">
        <div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="p-2 rounded-md bg-red-600 shadow-lg sm:p-2">
            <div class="flex items-center justify-between flex-wrap">
              <div class="w-0 flex-1 flex items-center">
                <p class="ml-3 font-medium text-white truncate">
                  <span> {error} </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-3">
      <div style="margin-bottom: 1em">
        <div
          class="g-signin2"
          data-longtitle="true"
          data-theme="dark"
          data-height="50"
          data-width="365"
          data-onsuccess="onGoogleSignIn" />
      </div>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm leading-5">
            <span class="px-2 bg-white text-gray-500"> Or </span>
          </div>
        </div>

        <form on:submit|preventDefault|stopPropagation={onLogin}>
          <label
            for="email"
            class="block text-sm font-medium leading-5 text-gray-700">Email</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center
                pointer-events-none">
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              id="email"
              autocomplete="email"
              type="email"
              bind:value={email}
              class="form-input block w-full pl-10 sm:text-sm sm:leading-5" />
          </div>
          <div class="mt-2">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700">Password</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center
                  pointer-events-none">
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                minlength="5"
                required
                autocomplete="current-password"
                bind:value={password}
                class="form-input block w-full pl-10 sm:text-sm sm:leading-5" />
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember_me" bind:checked={remember} type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
              <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
                Remember me
              </label>
            </div>
  
            <div class="text-sm leading-5">
              <a href="/account/forgot" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Forgot your password?
              </a>
            </div>
          </div>
  
          <div class="mt-5">
            {#if !processing}
              <Button type="primary" width={'full'} submit={true}>
                Sign In With Email
              </Button>
            {:else}
              <Button type="primary" width={'full'} disabled={true}>
                Signing In...
              </Button>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- <section
  class="min-vh-100 d-flex align-items-center section-image overlay-soft-dark"
  data-background="../../assets/img/pages/form-image.jpg">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 d-flex align-items-center justify-content-center">
        <div
          class="signin-inner mt-3 mt-lg-0 bg-white shadow-soft border rounded
            border-light p-4 p-lg-5 w-100 fmxw-500">
          {#if error}
            <div
              class="alert alert-danger alert-dismissible fade show"
              style="border-radius: 0;"
              role="alert">
              {error}
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          {/if}
          {#if processingGoogle && googleIdToken}
            <div
              style="text-align: center; padding-top: 1em; padding-bottom: 1em;">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div style="margin-top: 1em">
                <p><strong>Signing in with Google...</strong></p>
              </div>
            </div>
          {:else}
            <div>
              <div class="text-center text-md-center mb-4 mt-md-0">
                <div href="/" style="height: 100px">
                  <LogoDark />
                </div>
                <h1 style="margin-top: 1em" class="mb-0 h3">
                  Sign in to our Platform
                </h1>
              </div>
              <div style="margin-bottom: 1em">
                <div
                  class="g-signin2"
                  data-longtitle="true"
                  data-theme="dark"
                  data-height="50"
                  data-width="400"
                  data-onsuccess="onGoogleSignIn" />
              </div>
              <div
                class="separator"
                style="margin-bottom: 1em; margin-top: 1.5em">
                Or
              </div>
              <form on:submit|preventDefault|stopPropagation={onLogin}>
                <div class="form-group mb-4">
                  <label for="email">Your Email</label>
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon3"><span
                        class="fas fa-envelope" /></span>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      autocomplete="email"
                      bind:value={email} />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-group mb-4">
                    <label for="password">Your Password</label>
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon4"><span
                          class="fas fa-unlock-alt" /></span>
                      {#if showPassword}
                        <input
                          type="text"
                          minlength="6"
                          class="form-control"
                          id="password"
                          autocomplete="current-password"
                          bind:value={password} />
                      {:else}
                        <input
                          type="password"
                          minlength="6"
                          class="form-control"
                          id="password"
                          autocomplete="current-password"
                          bind:value={password} />
                      {/if}
                      {#if !showPassword}
                        <span on:click={togglePassword}>
                          <span
                            class="fas fa-eye"
                            style="position:absolute;top:0px;right:10px;margin-top:0.8em;" />
                        </span>
                      {:else}
                        <span on:click={togglePassword}>
                          <span
                            class="fas fa-eye-slash"
                            style="position:absolute;top:0px;right:10px;margin-top:0.8em;" />
                        </span>
                      {/if}
                    </div>
                  </div>
                  <div class="form-check mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      bind:checked={remember}
                      id="rememberMe" />
                    <label class="form-check-label" for="rememberMe">Remember me</label>
                  </div>
                </div>
                {#if !processing}
                  <button
                    type="submit"
                    class="btn btn-block btn-primary"
                    disabled={!valid}>Sign In With Email</button>
                {:else}
                  <button
                    type="submit"
                    class="btn btn-block btn-primary"
                    disabled={true}>Signing In...</button>
                {/if}
              </form>
              <div
                class="d-flex justify-content-center align-items-center mt-4">
                <span class="font-weight-normal">
                  Not signed up?
                  <Link href="/account/register" class="font-weight-bold">
                    Register here
                  </Link>
                </span>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section> -->
