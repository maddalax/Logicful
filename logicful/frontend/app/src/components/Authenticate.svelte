<script lang="typescript">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { me } from "@app/services/AuthService";
  import { navigate } from "svelte-routing";

  onMount(() => {
    const user = me();
    if (!user.id) {
      navigate("/account/login");
    }
  });
</script>

<div>
  <slot />
</div>
