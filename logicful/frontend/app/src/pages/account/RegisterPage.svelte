<script lang="typescript">
  import { postApi } from "@app/services/ApiService";
  import { setToken } from "@app/services/AuthService";
  import { afterUpdate } from "svelte";
  import type { UserToken } from "@app/services/AuthService";
  import { navigate } from "svelte-routing";
  import Button from "@app/components/Button.svelte";

  let email = "";
  let password = "";
  let name = "";
  let displayName = "";
  let agree = false;
  let valid = false;
  let showPassword = false;
  let creating = false;
  let error = "";
  let lastName = "";

  async function onRegister() {
    error = "";
    creating = true;
    if (!name && !displayName) {
      name = email.split("@")[0].trim();
      displayName = name;
    }
    try {
      const result = await postApi<UserToken>("user/register", {
        email,
        fullName: name,
        displayName,
        password,
      });
      if (result.token) {
        setToken(result);
        navigate("/");
      } else {
        error = "Failed to register, unknown response from server.";
      }
    } catch (ex) {
      if (ex.message === "email already exists") {
        error = "Email address is already in use.";
      } else {
        error = "Failed to register, something went wrong.";
      }
    } finally {
      creating = false;
    }
  }

  afterUpdate(() => {
    valid = isValid();
  });

  function onNameBlur() {
    if (name && lastName !== name) {
      displayName = name.trim().split(" ")[0] ?? "";
      lastName = name;
    }
  }

  function isValid(): boolean {
    return email != "" && password != "" && agree;
  }

  function togglePassword() {
    showPassword = !showPassword;
  }
</script>

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
      Sign up for our platform
    </h2>
    <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
      Or <a href="/account/login" class="font-medium text-indigo-600
          hover:text-indigo-500 focus:outline-none focus:underline transition
          ease-in-out duration-150"> Sign in </a>
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

        <form on:submit|preventDefault|stopPropagation={onRegister}>
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
              {#if showPassword}
                <input
                  id="password"
                  type="text"
                  minlength="5"
                  required
                  autocomplete="current-password"
                  bind:value={password}
                  class="form-input block w-full pl-10 sm:text-sm sm:leading-5" />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center
                    cursor-pointer"
                  on:click={togglePassword}>
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </div>
              {:else}
                <input
                  id="password"
                  type="password"
                  minlength="5"
                  required
                  autocomplete="current-password"
                  bind:value={password}
                  class="form-input block w-full pl-10 sm:text-sm sm:leading-5" />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center
                    cursor-pointer"
                  on:click={togglePassword}>
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              {/if}
            </div>
          </div>
          <div class="mt-5">
            {#if !creating}
              <Button type="primary" width={'full'} submit={true}>
                Sign Up With Email
              </Button>
            {:else}
              <Button type="primary" width={'full'} disabled={true}>
                Creating Account...
              </Button>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Section
<section class="min-vh-100 d-flex align-items-center section-image overlay-soft-dark" data-background="../../assets/img/pages/form-image.jpg">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 d-flex align-items-center justify-content-center">
        <div class="signin-inner mt-3 mt-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
          {#if error}
            <div class="alert alert-danger alert-dismissible fade show" style="border-radius: 0;" role="alert">
              {error} <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
            </div>
          {/if}
          <div class="text-center text-md-center mb-4 mt-md-0">
            <h1 class="mb-0 h3">Create an Account</h1>
          </div>
          <form on:submit|preventDefault|stopPropagation={onRegister}>
            <div class="form-group mb-4">
              <label for="fullName">Full Name</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><i class="fas fa-user" /></span>
                <input type="text" class="form-control" id="fullName" on:blur={onNameBlur} bind:value={name} />
              </div>
            </div>

            <div class="form-group mb-4">
              <label for="displayName">What should we call you?</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><i class="far fa-address-book" /></span>
                <input type="text" class="form-control" id="displayName" autocomplete="off" bind:value={displayName} />
              </div>
            </div>

            <div class="form-group mb-4">
              <label for="email">Your Email</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><span class="fas fa-envelope" /></span>
                <input type="email" class="form-control" id="email" bind:value={email} />
              </div>
            </div>
            <div class="form-group">
              <div class="form-group mb-4">
                <label for="password">Your Password</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon4"><span class="fas fa-unlock-alt" /></span>
                  {#if showPassword}
                    <input type="text" minlength="6" class="form-control" id="password" autocomplete="current-password" bind:value={password} />
                  {:else}<input type="password" minlength="6" class="form-control" id="password" autocomplete="current-password" bind:value={password} />{/if}
                  {#if !showPassword}
                    <span on:click={togglePassword}> <span class="fas fa-eye" style="position:absolute;top:0px;right:10px;margin-top:0.8em;" /> </span>
                  {:else}<span on:click={togglePassword}> <span class="fas fa-eye-slash" style="position:absolute;top:0px;right:10px;margin-top:0.8em;" /> </span>{/if}
                </div>
                <div class="form-text">Minimum 6 characters</div>
              </div>
              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" bind:checked={agree} id="defaultCheck6" />
                <label class="form-check-label" for="defaultCheck6"> I agree to the <a href="#">terms and conditions</a> </label>
              </div>
            </div>
            {#if !creating}
              <button type="submit" class="btn btn-block btn-primary" disabled={!valid}>Create Account</button>
            {:else}<button type="submit" class="btn btn-block btn-primary" disabled={true}>Creating Account...</button>{/if}
          </form>
          <div class="d-flex justify-content-center align-items-center mt-4">
            <span class="font-weight-normal"> Already have an account? <a href="./account/login" class="font-weight-bold">Login here</a> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> -->
