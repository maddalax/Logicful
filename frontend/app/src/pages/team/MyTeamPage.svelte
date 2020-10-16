<script lang="typescript">
import Shell from "@app/components/Shell.svelte";
import type { User } from "@app/models/User";
import { emptyUser, me } from "@app/services/AuthService";
import { onMount } from "svelte";
import NoTeam from "./NoTeam.svelte";

let user : User = emptyUser;

onMount(async () => {
    user = await me();
    console.log(user);
})

</script>

<Shell sidebar={[{
    href : '/team/members',
    name : 'Team Members'
}]}>
    <p>This is my team</p>
    {#if user.teamId === user.id}
        <NoTeam/>
    {/if}
</Shell>