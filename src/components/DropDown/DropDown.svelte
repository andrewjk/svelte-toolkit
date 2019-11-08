<script>
  import ChevronDown from "../../icons/ChevronDown.svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let buttonType = "info";
  export let buttonSize = "medium";
  export let buttonImage = false;

  let expanded = false;

  function toggleDropDown() {
    expanded = !expanded;
  }
</script>

<style>

</style>

<button
  {id}
  class={['drop-down', 'button', buttonType, buttonSize, buttonImage ? 'image' : null, className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  type="button"
  aria-haspopup="true"
  on:click={toggleDropDown}>
  <slot />
  {#if !buttonImage}
    <slot name="button">
      <ChevronDown />
    </slot>
  {/if}
</button>
{#if expanded}
  <div class="drop-down-menu">
    <slot name="menu" />
  </div>
{/if}
