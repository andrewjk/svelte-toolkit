<script>
  import { onMount } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let content = "";
  export let type = "";
</script>

<style src="FieldMessage.scss">

</style>

{#if content}
  <div
    {id}
    class={['field-message', type, className].filter(Boolean).join(' ')}>
    <slot>{content}</slot>
  </div>
{/if}
