<script>
  import { setContext, createEventDispatcher } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let value = null;
  export let type = "";
  export let placeholder = "Drag and drop a file here";

  let setFile = false;

  const dispatch = createEventDispatcher();

  // Allow children (Files, basically) to call the handleFiles method
  setContext("upload", {
    handleFiles
  });

  function handleDrop(e) {
    const files = e.dataTransfer.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    // TODO: Handle multiple files, if we can be bothered
    // And background upload, per the bottom of https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
    // And make sure it's not too big
    value = files[0];
    dispatch("change", value);
  }
</script>

<div
  {id}
  class={['upload', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  on:dragenter|stopPropagation|preventDefault={e => null}
  on:dragover|stopPropagation|preventDefault={e => null}
  on:drop|stopPropagation|preventDefault={e => handleDrop(e)}>
  <slot>
    {#if value}{value.name}{:else}{placeholder}{/if}
  </slot>
</div>
