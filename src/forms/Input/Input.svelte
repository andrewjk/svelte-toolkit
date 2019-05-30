<script>
  import { onMount, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  export let className = null;
  export let type = "text";

  export let value = "";

  export let validator = null;
  export let required = false;
  export let minlength = 0;
  export let maxlength = 0;
  export let regex = null;
  export let compareTo = "";
  export let friendlyName = "";

  const dispatch =  createEventDispatcher();

  onMount(() => {
    // Make sure we have a validator if required
    if (required || minlength || maxlength) {
      if (!name) {
        throw `Name required for input`;
      }
      if (!validator) {
        throw `Validator required for input '${name}'`;
      }
    }
    validator.register(
      name,
      getValue,
      { required, minlength, maxlength, regex, compareTo },
      friendlyName
    );
  });

  function getValue() {
    return value;
  }

  function handleBlur (e) {
    if (validator) {
      console.log('blurring')
      validator.validate();
    }
    dispatch('onblur', e)
  }
</script>

{#if type === 'text'}
  <input
    {id}
    class={['', className].filter(Boolean).join(' ')}
    bind:value
    type="text"
    maxlength={maxlength > 0 ? maxlength : 50000}
    on:blur={handleBlur} />
{/if}
