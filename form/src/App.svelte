<script lang="ts">
  import DynamicForm from "./DynamicForm.svelte";
  import form from "./form";
</script>

<main>
  <a class="usa-skipnav" href="#main-content">Skip to main content</a>
  <div class="usa-overlay" />
  <header class="usa-header usa-header--basic">
    <div class="usa-nav-container">
      <div class="usa-navbar">
        <div class="usa-logo" id="basic-logo">
          <em class="usa-logo__text">
            <a href="/" title="Home" aria-label="Home">LowCode</a>
          </em>
        </div>
        <button class="usa-menu-btn">Menu</button>
      </div>
      <nav aria-label="Primary navigation" class="usa-nav">
        <button class="usa-nav__close">
          <img src="/assets/img/close.svg" role="img" alt="close" />
        </button>
        <ul class="usa-nav__primary usa-accordion">
          <li class="usa-nav__primary-item">
            <button
              class="usa-accordion__button usa-nav__link usa-current"
              aria-expanded="false"
              aria-controls="basic-nav-section-one">
              <span>Current section</span>
            </button>
            <ul id="basic-nav-section-one" class="usa-nav__submenu">
              <li class="usa-nav__submenu-item">
                <a href="#" class="">Navigation link</a>
              </li>
              <li class="usa-nav__submenu-item">
                <a href="#" class="">Navigation link</a>
              </li>
              <li class="usa-nav__submenu-item">
                <a href="#" class="">Navigation link</a>
              </li>
            </ul>
          </li>
          <li class="usa-nav__primary-item">
            <button
              class="usa-accordion__button usa-nav__link"
              aria-expanded="false"
              aria-controls="basic-nav-section-two">
              <span>Section</span>
            </button>
            <ul id="basic-nav-section-two" class="usa-nav__submenu">
              <li class="usa-nav__submenu-item">
                <a href="#" class="">Navigation link</a>
              </li>
              <li class="usa-nav__submenu-item">
                <a href="#" class="">Navigation link</a>
              </li>
              <li class="usa-nav__submenu-item">
                <a href="#" class="">Navigation link</a>
              </li>
            </ul>
          </li>
          <li class="usa-nav__primary-item">
            <a class="usa-nav__link" href="javascript:void(0)">
              <span>Simple link</span>
            </a>
          </li>
        </ul>
        <form class="usa-search usa-search--small " role="search">
          <label class="usa-sr-only" for="basic-search-field-small">
            Search small
          </label>
          <input
            class="usa-input"
            id="basic-search-field-small"
            type="search"
            name="search" />
          <button class="usa-button" type="submit">
            <span class="usa-sr-only">Search</span>
          </button>
        </form>
      </nav>
    </div>
  </header>

  <div class="usa-section">
    <div class="grid-container">
      <div class="grid-row grid-gap">
        <div class="usa-layout-docs__sidenav desktop:grid-col-3">
          <nav aria-label="Secondary navigation">
            <ul class="usa-sidenav">
              <li class="usa-sidenav__item">
                <a href="">Parent link</a>
              </li>
              <li class="usa-sidenav__item">
                <a href="" class="usa-current">Current page</a>
                <ul class="usa-sidenav__sublist">
                  <li class="usa-sidenav__item">
                    <a href="">Child link</a>
                  </li>
                  <li class="usa-sidenav__item">
                    <a href="" class="usa-current">Child link</a>
                    <ul class="usa-sidenav__sublist">
                      <li class="usa-sidenav__item">
                        <a href="">Grandchild link</a>
                      </li>
                      <li class="usa-sidenav__item">
                        <a href="">Grandchild link</a>
                      </li>
                      <li class="usa-sidenav__item">
                        <a href="" class="usa-current">Grandchild link</a>
                      </li>
                      <li class="usa-sidenav__item">
                        <a href="">Grandchild link</a>
                      </li>
                    </ul>
                  </li>
                  <li class="usa-sidenav__item">
                    <a href="">Child link</a>
                  </li>
                  <li class="usa-sidenav__item">
                    <a href="">Child link</a>
                  </li>
                  <li class="usa-sidenav__item">
                    <a href="">Child link</a>
                  </li>
                </ul>
              </li>
              <li class="usa-sidenav__item">
                <a href="">Parent link</a>
              </li>
            </ul>
          </nav>

        </div>

        <main
          class="usa-layout-docs__main desktop:grid-col-9 usa-prose
          usa-layout-docs"
          id="main-content">
          <DynamicForm {form}/>
        </main>
      </div>
    </div>
  </div>
</main>
