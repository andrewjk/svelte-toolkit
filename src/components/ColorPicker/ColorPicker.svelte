<script>
  import { tick } from "svelte";

  import ChevronDown from "../../icons/ChevronDown.svelte";
  import Palette from "../Palette/Palette.svelte";

  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let value = null;
  export let placeholder = "";

  let expanded = false;
  let focus = false;
  let container;
  let inputContainer;
  let input;
  let list;

  async function toggleList() {
    expanded = !expanded;
    await tick();
    if (expanded) {
      list.style.width = inputContainer.offsetWidth + "px";
      list.childNodes[0].focus();
      document.addEventListener("click", handleCloseClick);
    } else {
      input.focus();
      document.removeEventListener("click", handleCloseClick);
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
    //if (expanded) {
    //  toggleList();
    //}
  }

  function setValue(color) {
    value = color;
  }
</script>

<style src="ColorPicker.scss" global>

</style>

<div
  {id}
  class={['color-picker', 'drop-down', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  bind:this={container}>
  <div
    bind:this={inputContainer}
    class="drop-down-input-container"
    class:focus>
    {#if value}
      <div class="color-picker-preview" style={`background-color: ${value}`} />
    {/if}
    <input
      class="drop-down-input"
      bind:value
      bind:this={input}
      {placeholder}
      on:keydown={handleInputKey}
      on:focus={handleInputFocus}
      on:blur={handleInputBlur} />
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
