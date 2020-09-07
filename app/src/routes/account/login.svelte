<script lang="typescript">
  import { postApi } from 'services/ApiService'
  import { setToken } from 'services/AuthService'
  import { afterUpdate } from 'svelte'
  import { goto } from '@sapper/app'
  import type { UserToken } from 'services/AuthService'

  let email = ''
  let password = ''
  let remember = true
  let valid = false
  let showPassword = false
  let processing = false
  let error = ''

  async function onLogin() {
    error = ''
    processing = true
    email = email.trim().toLowerCase()
    try {
      const result = await postApi<UserToken>('user/login', {
        email,
        password,
      })
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
          <div class="text-center text-md-center mb-4 mt-md-0">
            <h1 class="mb-0 h3">Login to our Platform</h1>
          </div>
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
              <button type="submit" class="btn btn-block btn-primary" disabled={!valid}>Login</button>
            {:else}<button type="submit" class="btn btn-block btn-primary" disabled={true}>Logging In...</button>{/if}
          </form>
          <div class="d-flex justify-content-center align-items-center mt-4">
            <span class="font-weight-normal"> Not signed up? <a href="/account/register" class="font-weight-bold">Register here</a> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
