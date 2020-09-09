<script lang="typescript">
  import { postApi } from 'services/ApiService'
  import { setToken } from 'services/AuthService'
  import { afterUpdate, onMount } from 'svelte'
  import { goto } from '@sapper/app'
  import type { UserToken } from 'services/AuthService'
  import LogoDark from 'components/layout/logos/LogoDark.svelte'

  let email = ''
  let password = ''
  let remember = true
  let valid = false
  let showPassword = false
  let processing = false
  let error = ''
  let processingGoogle = false
  let googleIdToken = ''

  onMount(() => {
    //@ts-ignore
    window.onGoogleSignIn = (user: any) => {
      processingGoogle = true
      const idToken = user.getAuthResponse().id_token
      googleIdToken = idToken
      onGoogleLogin()
    }
  })

  async function onGoogleLogin() {
    await doLogin('user/login/google', {
      token: googleIdToken,
    })
  }

  async function onLogin() {
    error = ''
    processing = true
    email = email.trim().toLowerCase()
    await doLogin('user/login', {
      email,
      password,
    })
  }

  async function doLogin(endpoint: string, body: any) {
    try {
      const result = await postApi<UserToken>(endpoint, body)
      if (result.token) {
        setToken(result, remember)
        goto('/', { replaceState: true })
      } else {
        error = 'Failed to login, unknown response from server.'
      }
    } catch (ex) {
      if (ex.message === 'invalid username or password') {
        error = 'Invalid username or password.'
      } else {
        error = 'Failed to login, something went wrong.'
      }
    } finally {
      processing = false
    }
  }

  afterUpdate(() => {
    valid = isValid()
  })

  function isValid(): boolean {
    return email != '' && password != ''
  }

  function togglePassword() {
    showPassword = !showPassword
  }
</script>

<!-- Section -->

<svelte:head>
  <meta name="google-signin-client_id" content="507014281135-ff3semdge1t7iu6jdi63h3ido0ch4k4q.apps.googleusercontent.com" />
  <script src="https://apis.google.com/js/platform.js" async defer>

  </script>
</svelte:head>

<section class="min-vh-100 d-flex align-items-center section-image overlay-soft-dark" data-background="../../assets/img/pages/form-image.jpg">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 d-flex align-items-center justify-content-center">
        <div class="signin-inner mt-3 mt-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
          {#if error}
            <div class="alert alert-danger alert-dismissible fade show" style="border-radius: 0;" role="alert">
              {error}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
            </div>
          {/if}
          {#if processingGoogle && googleIdToken}
            <div style="text-align: center; padding-top: 1em; padding-bottom: 1em;">
              <div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div>
              <div style="margin-top: 1em">
                <p><strong>Signing in with Google...</strong></p>
              </div>
            </div>
          {:else}
            <div>
              <div class="text-center text-md-center mb-4 mt-md-0">
                <div href="/" style="height: 100px">
                  <LogoDark/>
                </div>
                <h1 style="margin-top: 1em" class="mb-0 h3">Sign in to our Platform</h1>
              </div>
              <div style="margin-bottom: 1em">
                <div class="g-signin2" data-longtitle="true" data-theme="dark" data-height="50" data-width="400" data-onsuccess="onGoogleSignIn" />
              </div>
              <div class="separator" style="margin-bottom: 1em; margin-top: 1.5em">Or</div>
              <form on:submit|preventDefault|stopPropagation={onLogin}>
                <!-- Form -->
                <div class="form-group mb-4">
                  <label for="email">Your Email</label>
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon3"><span class="fas fa-envelope" /></span>
                    <input type="email" class="form-control" id="email" autocomplete="email" bind:value={email} />
                  </div>
                </div>
                <!-- End of Form -->
                <div class="form-group">
                  <!-- Form -->
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
                  </div>
                  <!-- End of Form -->
                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" bind:checked={remember} id="rememberMe" />
                    <label class="form-check-label" for="rememberMe">Remember me</label>
                  </div>
                </div>
                {#if !processing}
                  <button type="submit" class="btn btn-block btn-primary" disabled={!valid}>Sign In With Email</button>
                {:else}<button type="submit" class="btn btn-block btn-primary" disabled={true}>Signing In...</button>{/if}
              </form>
              <div class="d-flex justify-content-center align-items-center mt-4">
                <span class="font-weight-normal"> Not signed up? <a href="/account/register" class="font-weight-bold">Register here</a> </span>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
