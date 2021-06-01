<script>
  import { getContext, setContext, onDestroy } from "svelte";

  import ChevronDown from "../../icons/ChevronDown";
  import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";

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
      document.removeEventListener("click", handleCloseClick);
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
        document.addEventListener("click", handleCloseClick);
      } else {
        document.removeEventListener("click", handleCloseClick);
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
  <a
    {href}
    class="nav-menu-link"
    aria-haspopup="true"
    on:click={handleClick}
  >
    <slot />
    <slot name="button">
      <ChevronDown />
    </slot>
  </a>
  {#if expanded}
    <DropDownMenu on:change={() => expanded = false}>
      <slot name="menu" />
    </DropDownMenu>
  {/if}
</li>

<style src="NavMenuDropDown.scss">
</style>
