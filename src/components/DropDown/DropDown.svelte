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
  let container;
  let button;
  let menu;

  function toggleDropDown(e) {
  function toggleDropDown() {
    expanded = !expanded;
    if (expanded) {
      document.addEventListener("click", handleCloseClick);
    } else {
      document.removeEventListener("click", handleCloseClick);
    }
  }

  function handleCloseClick(e) {
    if (!container.contains(e.target)) {
      toggleDropDown();
    }
  }

</style>
</script>

<div class="drop-down" bind:this={container}>
  <button
    {id}
    class={['drop-down-button', 'button', buttonType, buttonSize, buttonImage ? 'image' : null, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    type="button"
    aria-haspopup="true"
    bind:this={button}
    on:click={toggleDropDown}>
    <slot />
    {#if !buttonImage}
      <slot name="button">
        <ChevronDown />
      </slot>
    {/if}
  </button>
  {#if expanded}
    <div class="drop-down-menu" bind:this={menu}>
      <slot name="menu" />
    </div>
  {/if}
</div>
