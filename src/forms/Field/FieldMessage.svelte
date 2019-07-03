<script>
  import { onMount } from "svelte";

  export let id = null;
  export let name = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let content = "";
  export let type = "";
</script>

{#if content}
  <div
    {id}
    class={['field-message', type, className].concat(classNames).filter(Boolean).join(' ')}>
    <slot>{content}</slot>
  </div>
{/if}
