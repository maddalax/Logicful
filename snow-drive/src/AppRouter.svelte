<script>
  import { Router, Link, Route } from "svelte-routing";
  import Authenticate from "./components/Authenticate.svelte";
  import LoginPage from "./pages/account/LoginPage.svelte";
  import LogoutPage from "./pages/account/LogoutPage.svelte";
  import RegisterPage from "./pages/account/RegisterPage.svelte";
import DashboardPage from "./pages/DashboardPage.svelte";
  import FolderPage from "./pages/folder/FolderPage.svelte";
  import CreateFormPage from "./pages/form/CreateFormPage.svelte";
  import FormBuilderPage from "./pages/form/FormBuilderPage.svelte";
  import FormSubmissionsPage from "./pages/form/FormSubmissionsPage.svelte";
  import PreviewFormPage from "./pages/form/PreviewFormPage.svelte";
</script>

<!-- App.svelte -->
<Router>
  <div>
    <Route path="/">
      <Authenticate>
        <DashboardPage />
      </Authenticate>
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
  </div>
</Router>
