<script>
  import { onDestroy, tick } from "svelte";

  import Button from "../Button/Button";
  import ChevronDown from "../../icons/ChevronDown";
  import DropDownMenu from "../DropDownMenu/DropDownMenu";

  import { addDocumentEvent, removeDocumentEvent } from "../../utils/document-events";

  console.warn("Svelte Toolkit: DropDown is obsolete -- use DropDownButton or DropDownLink instead");

  export let id = null;
  let className = null;
  export { className as class };
  export let buttonType = "info";
  export let buttonSize = "medium";
  export let position = "below";
  export let alignment = "start";
  export let expanded = false;

  let container;
  let button;
  let menu;

  $: expandedChanged(expanded);

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
    if (expanded) {
      positionList();
      addDocumentEvent("click", handleCloseClick);
    } else {
      removeDocumentEvent("click", handleCloseClick);
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
    var rect = button.getBoundingClientRect();
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
  class={["drop-down", className].filter(Boolean).join(" ")}
  bind:this={container}
>
  <div class="drop-down-button-container" bind:this={button}>
    <slot name="element">
      <Button
        class="drop-down-button"
        type={buttonType}
        size={buttonSize}
        hasPopup={true}
        on:click={toggleDropDown}
      >
        <slot />
        <div class="drop-down-icon-container">
          <slot name="button">
            <ChevronDown />
          </slot>
        </div>
      </Button>
    </slot>
  </div>
  {#if expanded}
    <div class={["drop-down-menu-container", alignment].filter(Boolean).join(" ")} bind:this={menu}>
      <DropDownMenu>
        <slot name="menu" />
      </DropDownMenu>
    </div>
  {/if}
</div>

<style src="DropDown.scss">
</style>
