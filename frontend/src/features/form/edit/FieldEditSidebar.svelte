<script lang="ts">
  import {onMount} from "svelte";
  import FieldEdit from "./FieldEdit.svelte";
  import type {IField} from "models/IField";
  import {subscribe} from "event/EventBus";
  import type {IForm} from "models/IForm";
  import {fade, slide} from "svelte/transition";
  import FormEdit from "./FormEdit.svelte";
  import {dispatch} from "event/EventBus";

  let form: IForm;
  let active: string = '';

  onMount(() => {

    subscribe("form_loaded", (props) => {
      form = props.form;
    })

    dispatch("right_sidebar_loaded", {})

    subscribe("edit_field", (props) => {
      console.log(props);
      form = props.form;
      active = props.active;
    });
  });
</script>

<div>
  {#if active !== ''}
    <div class="col-md no-gutters">
      {#each form.fields as field(field.id)}
        {#if field.id === active}
          <div transition:slide={{ duration: 500 }}>
            <FieldEdit {field} />
          </div>
        {/if}
      {/each}
    </div>
  {:else}
    <div class="col-md no-gutters">
      {#if form}
        <FormEdit form={form}/>
      {/if}
    </div>
  {/if}
</div>
