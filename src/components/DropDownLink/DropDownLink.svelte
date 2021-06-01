<script>
  import { onDestroy, tick } from "svelte";

  import ChevronDown from "../../icons/ChevronDown";
  import DropDownMenu from "../DropDownMenu/DropDownMenu";

  export let id = null;
  let className = null;
  export { className as class };
  export let position = "below";
  export let alignment = "start";
  export let expanded = false;

  let container;
  let link;
  let menu;

  $: expandedChanged(expanded);

  onDestroy(() => {
    if (expanded) {
      // Hide the menu and remove the document click event
      showOrHide();
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
    if (expanded) {
      positionList();
      document.addEventListener("click", handleCloseClick);
    } else {
      document.removeEventListener("click", handleCloseClick);
    }
  }

  function handleCloseClick(e) {
    if (!container.contains(e.target)) {
      toggleDropDown(e);
    }
  }

  async function positionList() {
    await tick();
    // TODO: Take into account window width in case the menu would be outside the bounds
    var rect = link.getBoundingClientRect();
    var menuRect = menu.childNodes[0].getBoundingClientRect();
    switch (position) {
      case "above":
        menu.style.bottom = rect.height + menuRect.height + "px";
        break;
      case "below":
        menu.style.top = rect.height + "px";
        break;
    }
    switch (alignment) {
      case "start":
        menu.style.left = "0px";
        break;
      case "center":
        menu.style.left = rect.width / 2 - menuRect.width / 2 + "px";
        break;
      case "end":
        menu.style.left = rect.width - menuRect.width + "px";
        break;
    }
  }
</script>

<div
  {id}
  class={["drop-down-link", className].filter(Boolean).join(" ")}
  bind:this={container}
>
  <div class="drop-down-link-container" bind:this={link}>
    <slot name="element">
      <button
        type="button"
        class="link"
        hasPopup={true}
        on:click={toggleDropDown}
      >
        <slot />
        <div class="drop-down-icon-container">
          <slot name="button">
            <ChevronDown />
          </slot>
        </div>
      </button>
    </slot>
  </div>
  {#if expanded}
    <div
      class={["drop-down-menu-container", alignment].filter(Boolean).join(" ")}
      bind:this={menu}
    >
      <DropDownMenu>
        <slot name="menu" />
      </DropDownMenu>
    </div>
  {/if}
</div>

<style src="DropDownLink.scss">
</style>
