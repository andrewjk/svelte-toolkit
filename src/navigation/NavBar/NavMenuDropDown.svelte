<script>
  import { getContext, setContext, onDestroy } from "svelte";

  import ChevronDown from "../../icons/ChevronDown/ChevronDown.svelte";
  import DropDownMenu from "../../components/DropDownMenu/DropDownMenu.svelte";

  import {
    addDocumentEvent,
    removeDocumentEvent,
  } from "../../utils/document-events";

  export let id = null;
  let className = null;
  export { className as class };
  export let active = false;
  export let expanded = false;

  $: expandedChanged(expanded);

  let container;

  // HACK: To avoid an accessibility warning - but I think it's fine to use an
  // anchor with href="#" on a drop-down?
  const href = "#";

  var context = getContext("navmenu");
  if (context) {
    setContext("dropdownmenu", {
      position: context.position,
    });
  }

  onDestroy(() => {
    if (expanded) {
      removeDocumentEvent("click", handleCloseClick);
    }
  });

  function expandedChanged(value) {
    showOrHide();
  }

  function toggleDropDown(e) {
    e.preventDefault();
    expanded = !expanded;
  }

  function showOrHide() {
    if (typeof window !== "undefined") {
      if (expanded) {
        addDocumentEvent("click", handleCloseClick);
      } else {
        removeDocumentEvent("click", handleCloseClick);
      }
    }
  }

  function handleCloseClick(e) {
    if (!container.contains(e.target)) {
      toggleDropDown(e);
    }
  }

  function handleMouseEnter(e) {
    if (!expanded) {
      toggleDropDown(e);
    }
  }

  function handleMouseLeave(e) {
    if (expanded) {
      toggleDropDown(e);
    }
  }

  function handleClick(e) {
    toggleDropDown(e);
  }
</script>

<li
  {id}
  class={["nav-menu-drop-down", className].filter(Boolean).join(" ")}
  class:active
  role="menuitem"
  bind:this={container}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <a {href} class="nav-menu-link" aria-haspopup="true" on:click={handleClick}>
    <slot />
    <slot name="button">
      <ChevronDown />
    </slot>
  </a>
  {#if expanded}
    <DropDownMenu on:change={() => (expanded = false)}>
      <slot name="menu" />
    </DropDownMenu>
  {/if}
</li>

<style>
  /* These styles were automatically generated from NavMenuDropDown.scss */
  .nav-menu-drop-down {
    display: inline-block;
    font-size: var(--font-size-title, 1.6rem);
    margin: 0;
    padding: 0;
    position: relative;
    white-space: nowrap;
  }

  .nav-menu-link {
    background-color: var(--nav-bar-item-back-color, transparent);
    color: var(--nav-bar-item-text-color, #222);
    padding: calc(var(--element-padding, 2rem) / 4) var(--element-padding, 2rem);
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .nav-menu-link:hover,
  .nav-menu-link:focus {
    background-color: var(--nav-bar-item-hover-back-color, rgba(0, 0, 0, 0.1));
    color: var(--nav-bar-item-hover-text-color, #222);
  }
</style>
