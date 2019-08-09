<script>
  import { getContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let value = null;
  export let placeholder = "Select a file";
  export let accept = "";

  const dispatch = createEventDispatcher();

  // Get the handleFiles method from any parent Upload, so that we can pass the selected files along
  const { handleFiles } = getContext("upload") || {};

  function handleInput(e) {
    if (handleFiles) {
      handleFiles(e.target.files);
    }
    value = e.target.files[0];
    dispatch("change", value);
    dispatch("input", e);
  }
</script>

<label
  {id}
  class={['file', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <input
    class="file-input"
    {name}
    type="file"
    {accept}
    on:keydown
    on:keyup
    on:keypress
    on:input={handleInput}
    on:focus
    on:blur />
  <span>
    <slot>
      {#if value}{value.name}{:else}{placeholder}{/if}
    </slot>
  </span>
</label>
