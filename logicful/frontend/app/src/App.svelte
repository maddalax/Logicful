<script lang="typescript">
  import './main.css'
  import { afterUpdate, onMount } from "svelte";

  import AppRouter from "./AppRouter.svelte";
  import ErrorDialog from "./components/ErrorDialog.svelte";
  import { me } from "./services/AuthService";

  let setHeap = false;

  function initHeap() {
    if (setHeap) {
      return;
    }
    const user = me();
    if (user) {
      console.log(user);
      //@ts-ignore
      console.log(window.heap);
      console.log("Setting heap");
      //@ts-ignore
      window.heap.identify(user.id);
      //@ts-ignore
      window.heap.addUserProperties({ email: user.email });
      setHeap = true;
    }
  }

  afterUpdate(() => {
    initHeap();
  });

  onMount(() => {
    initHeap();
  });
</script>

<ErrorDialog />
<AppRouter />