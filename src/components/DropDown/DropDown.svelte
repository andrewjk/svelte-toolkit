<script>
  import ChevronDown from "../../icons/ChevronDown.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "info";

  let expanded = false;

  function toggleDropDown() {
    expanded = !expanded;
  }
</script>

<style>

</style>

<button
  {id}
  class={['drop-down', 'button', 'inline', type, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  type="button"
  aria-haspopup="true"
  on:click={toggleDropDown}>
  <slot />
  <ChevronDown />
</button>
{#if expanded}
  <div class="drop-down-menu">
    <slot name="menu" />
  </div>
{/if}