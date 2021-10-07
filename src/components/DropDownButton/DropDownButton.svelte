<script>
  import { onDestroy, tick } from "svelte";

  import Button from "../Button/Button.svelte";
  import ChevronDown from "../../icons/ChevronDown/ChevronDown.svelte";
  import DropDownMenu from "../DropDownMenu/DropDownMenu.svelte";

  import {
    addDocumentEvent,
    removeDocumentEvent,
  } from "../../utils/document-events";

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
  class={["drop-down-button", className].filter(Boolean).join(" ")}
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

<style>
  /* These styles were automatically generated from DropDownButton.scss */
  .drop-down-list {
    background-color: var(--list-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    color: var(--list-text-color, rgba(0, 0, 0, 0.7));
    max-height: 24.4rem;
    overflow: auto;
    position: absolute;
    z-index: 10000;
  }

  .drop-down-button {
    display: inline-block;
    position: relative;
  }

  .drop-down-button-container {
    display: inline-block;
  }

  .drop-down-menu-container {
    display: inline-block;
    position: absolute;
  }

  .drop-down-menu-container.start {
    text-align: start;
  }

  .drop-down-menu-container.center {
    text-align: center;
  }

  .drop-down-menu-container.end {
    text-align: end;
  }

  .drop-down-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(* + .drop-down-icon-container) {
    margin-left: calc(var(--element-margin, 1.5rem) / 2);
  }

  :global(.drop-down-icon-container + *) {
    margin-left: calc(var(--element-margin, 1.5rem) / 2);
  }
</style>
