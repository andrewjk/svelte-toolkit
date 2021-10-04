<script>
  import { tick } from "svelte";

  import ChevronDown from "../../icons/ChevronDown.svelte";
  import Palette from "../Palette/Palette.svelte";

  import { keyCodes } from "../../utils/key-codes";
  import { rgbToHex } from "../../utils/color-utils";
  import {
    addDocumentEvent,
    removeDocumentEvent,
  } from "../../utils/document-events";

  export let id = null;
  let className = null;
  export { className as class };

  export let value = null;
  export let placeholder = "";

  let expanded = false;
  let focus = false;
  let container;
  let inputContainer;
  let preview;
  let input;
  let list;

  async function toggleList() {
    expanded = !expanded;
    await tick();
    if (expanded) {
      list.style.width = inputContainer.offsetWidth + "px";
      list.childNodes[0].focus();
      addDocumentEvent("click", handleCloseClick);
    } else {
      input.focus();
      removeDocumentEvent("click", handleCloseClick);
    }
  }

  function handleCloseClick(e) {
    if (!container.contains(e.target)) {
      toggleList();
    }
  }

  function handleButtonClick() {
    toggleList();
  }

  function handleInputKey(e) {
    switch (e.keyCode) {
      case keyCodes.esc:
      case keyCodes.up: {
        e.preventDefault();
        if (expanded) {
          toggleList();
        }
        break;
      }
      case keyCodes.down: {
        e.preventDefault();
        if (!expanded) {
          toggleList();
        }
        break;
      }
    }
  }

  function handleInputFocus(e) {
    focus = true;
    if (expanded) {
      toggleList();
    }
  }

  function handleInputBlur(e) {
    focus = false;
    if (value.indexOf("#") !== 0) {
      const color = window
        .getComputedStyle(preview, null)
        .getPropertyValue("background-color");
      const regex =
        /(?:rgb|rgba)\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d\.]+))*\)/i;
      const matches = regex.exec(color);
      const r = parseInt(matches[1]);
      const g = parseInt(matches[2]);
      const b = parseInt(matches[3]);
      let a = parseFloat(matches[4]);
      if (isNaN(a)) a = 1;
      value = rgbToHex(r, g, b, a);
    }
    //if (expanded) {
    //  toggleList();
    //}
  }

  function setValue(color) {
    value = color;
  }
</script>

<div
  {id}
  class={["color-picker", "drop-down", className].filter(Boolean).join(" ")}
  bind:this={container}
>
  <div bind:this={inputContainer} class="drop-down-input-container" class:focus>
    {#if value}
      <div
        bind:this={preview}
        class="color-picker-preview"
        style={`background-color: ${value}`}
      />
    {/if}
    <input
      class="drop-down-input"
      bind:value
      bind:this={input}
      {placeholder}
      on:keydown={handleInputKey}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur}
    />
    <div class="input-button" on:click={handleButtonClick}>
      <slot name="button">
        <ChevronDown />
      </slot>
    </div>
  </div>
  {#if expanded}
    <div bind:this={list} class="drop-down-list">
      <Palette bind:value on:close={toggleList} />
    </div>
  {/if}
</div>

<style src="ColorPicker.scss">
</style>
