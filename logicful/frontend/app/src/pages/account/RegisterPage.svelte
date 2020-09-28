<script lang="typescript">
  import { postApi } from '@app/services/ApiService'
  import { setToken } from '@app/services/AuthService'
  import { afterUpdate } from 'svelte'
  import type {UserToken} from '@app/services/AuthService'
  import { navigate } from "svelte-routing";

  let email = ''
  let password = ''
  let name = ''
  let displayName = ''
  let agree = false
  let valid = false
  let showPassword = false
  let creating = false
  let error = ''
  let lastName = ''

  async function onRegister() {
    error = ''
    creating = true
    if (!name && !displayName) {
      name = email.split('@')[0].trim()
      displayName = name
    }
    try {
      const result = await postApi<UserToken>('user/register', {
        email,
        fullName: name,
        displayName,
        password,
      })
      if (result.token) {
        setToken(result)
        navigate('/')
      } else {
        error = 'Failed to register, unknown response from server.'
      }
    } catch (ex) {
      if (ex.message === 'email already exists') {
        error = 'Email address is already in use.'
      } else {
        error = 'Failed to register, something went wrong.'
      }
    } finally {
      creating = false
    }
  }

  afterUpdate(() => {
    valid = isValid()
  })

  function onNameBlur() {
    if (name && lastName !== name) {
      displayName = name.trim().split(' ')[0] ?? ''
      lastName = name
    }
  }

  function isValid(): boolean {
    return email != '' && password != '' && agree
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

            <!-- Form -->
            <div class="form-group mb-4">
              <label for="email">Your Email</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3"><span class="fas fa-envelope" /></span>
                <input type="email" class="form-control" id="email" bind:value={email} />
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
                <div class="form-text">Minimum 6 characters</div>
              </div>
              <!-- End of Form -->
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
</section>
