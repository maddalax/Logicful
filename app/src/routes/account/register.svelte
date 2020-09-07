<script lang="typescript">
import { postApi } from 'services/ApiService';

  import { afterUpdate } from 'svelte'

  let email = ''
  let password = ''
  let agree = false
  let valid = false
  let showPassword = false
  let creating = false;

  async function onRegister() {
    creating = true;
    try {
        const result = await postApi("user/register", {
            email,
            password
        })
        console.log(result);
    } catch(ex) {
        console.log(ex, ex.message, ex.toString())
        if(ex.message === 'email already exists') {
            alert("EMAIL EXISTS")
        }
    } finally {
        creating = false;
    }
  }

  afterUpdate(() => {
    valid = isValid()
  })

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
          <div class="text-center text-md-center mb-4 mt-md-0">
            <h1 class="mb-0 h3">Create An Account</h1>
          </div>
          <form on:submit|preventDefault|stopPropagation={onRegister}>
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
                  <input type="text" minlength="6" placeholder="Password" class="form-control" id="password" bind:value={password} />
                  {:else}
                  <input type="password" minlength="6" placeholder="Password" class="form-control" id="password" bind:value={password} />
                  {/if}
                  {#if !showPassword}
                  <span on:click={togglePassword}>
                        <span class="fas fa-eye" style="position:absolute;top:0px;right:10px;margin-top:0.8em;" /> 
                  </span>
                  {:else}
                  <span on:click={togglePassword}>
                    <span class="fas fa-eye-slash" style="position:absolute;top:0px;right:10px;margin-top:0.8em;" /> 
              </span>
                  {/if}
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
            {:else}
            <button type="submit" class="btn btn-block btn-primary" disabled={true}>Creating Account...</button>
            {/if}
          </form>
          <div class="d-flex justify-content-center align-items-center mt-4">
            <span class="font-weight-normal"> Already have an account? <a href="./account/login" class="font-weight-bold">Login here</a> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
