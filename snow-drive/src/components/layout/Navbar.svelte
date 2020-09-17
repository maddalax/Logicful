<script lang="typescript">
  import type { User } from "@app/models/User";
  import { me } from "@app/services/AuthService";
  import { onMount } from "svelte";
  import LogoWhite from "./logos/LogoWhite.svelte";
  import Link from "../Link.svelte";

  let user: User;

  onMount(() => {
    user = me();
  });
</script>

<style>
  .navbar-dark {
    background-color: #252f4c !important;
  }

  .btn {
    border-radius: 0.3em !important;
  }
</style>

<header class="header-global">
  <nav
    id="navbar-main"
    aria-label="Primary navigation"
    class="navbar navbar-main navbar-expand-lg navbar-theme-primary navbar-dark">
    <div style="margin-left: 2.5em;height:36px;width:100px;position:absolute">
      <Link href="/">
        <LogoWhite />
      </Link>
    </div>
    <div
      class="container position-relative"
      style="max-width: none; padding-right: 2.5em;padding-left: 7.5em;">
      <span style="padding-right: 1.8em;" />
      <div class="navbar-collapse collapse mr-auto" id="navbar_global">
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <Link href="/index.html">
                <img src="/assets/img/brand/logicful-white.png" alt="logo" />
              </Link>
            </div>
            <div class="col-6 collapse-close">
              <Link
                href="#navbar_global"
                class="fas fa-times"
                data-toggle="collapse"
                data-target="#navbar_global"
                aria-controls="navbar_global"
                aria-expanded="false"
                title="close"
                aria-label="Toggle navigation" />
            </div>
          </div>
        </div>
        <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
          <li class="nav-item">
            <Link href="/" class="nav-link">
              <span
                class="fas fa-columns"
                style="color: white; font-size: 1.1em; width: none; padding-right: 0.1em;" />
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <div style="display: flex; vertical-align: middle;">
              <Link href="/folder" class="nav-link">
                <span
                  class="fas fa-bars"
                  style="color: white; font-size: 1.1em; width: none; padding-right: 0.1em;" />
                My Forms
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center">
        {#if user}
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-soft animate-up-2"
              data-toggle="dropdown"
              aria-expanded="false">
              My Account
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link class="dropdown-item" href="/account/settings">
                  <strong>{user.fullName}</strong>
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" href="/account/settings">
                  Settings
                </Link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <Link class="dropdown-item" href="/account/logout">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        {/if}
        <button
          class="navbar-toggler ml-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbar_global"
          aria-controls="navbar_global"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" />
        </button>
      </div>
    </div>
  </nav>
</header>
