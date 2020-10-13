<script>
  import { Router, Link, Route } from "svelte-routing";
  import Authenticate from "./components/Authenticate.svelte";
  import AccountSettingsPage from "./pages/account/AccountSettingsPage.svelte";
  import BillingPage from "./pages/account/BillingPage.svelte";
  import LoginPage from "./pages/account/LoginPage.svelte";
  import LogoutPage from "./pages/account/LogoutPage.svelte";
  import ManageTeamPage from "./pages/account/ManageTeamPage.svelte";
  import RegisterPage from "./pages/account/RegisterPage.svelte";
  import DashboardPage from "./pages/DashboardPage.svelte";
  import FolderPage from "./pages/folder/FolderPage.svelte";
  import CreateFormPage from "./pages/form/CreateFormPage.svelte";
  import FormBuilderPage from "./pages/form/FormBuilderPage.svelte";
  import FormSubmissionsPage from "./pages/form/FormSubmissionsPage.svelte";
  import PreviewFormPage from "./pages/form/PreviewFormPage.svelte";
  import Navbar from "@app/components/layout/Navbar.svelte";
  import Preloader from "@app/components/layout/Preloader.svelte";
  import { afterUpdate, onMount } from "svelte";
import PricingPage from "./pages/pricing/PricingPage.svelte";
import IndexPage from "./pages/IndexPage.svelte";
  let path = "";


  $: {
    path = window.location.pathname;
  }

  const noNav = [
    "/account/login",
    "/account/register",
    "/account/logout",
    "/form/preview",
  ];
</script>



<!-- App.svelte -->
<Router>
  <div>
    <Route path="/">
      <IndexPage/>
    </Route>
    <Route path="/dashboard">
      <DashboardPage/>
    </Route>
    <Route path="/form/builder">
      <Authenticate>
        <FormBuilderPage />
      </Authenticate>
    </Route>
    <Route path="/form/create">
      <Authenticate>
        <CreateFormPage />
      </Authenticate>
    </Route>
    <Route path="/form/preview">
      <PreviewFormPage />
    </Route>
    <Route path="/form/submissions">
      <Authenticate>
        <FormSubmissionsPage />
      </Authenticate>
    </Route>
    <Route path="/folder">
      <Authenticate>
        <FolderPage />
      </Authenticate>
    </Route>
    <Route path="/account/register">
      <RegisterPage />
    </Route>
    <Route path="/account/login">
      <LoginPage />
    </Route>
    <Route path="/account/logout">
      <LogoutPage />
    </Route>
    <Route path="/account/settings">
      <Authenticate>
        <AccountSettingsPage />
      </Authenticate>
    </Route>
    <Route path="/account/settings/team">
      <Authenticate>
        <ManageTeamPage />
      </Authenticate>
    </Route>
    <Route path="/account/settings/billing">
      <Authenticate>
        <BillingPage />
      </Authenticate>
    </Route>
    <Route path="/pricing">
      <PricingPage/>
    </Route>
  </div>
</Router>
