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
  let input;
  let list;

  async function toggleList() {
    expanded = !expanded;
    await tick();
    if (expanded) {
      list.style.width = container.offsetWidth + "px";
      list.childNodes[0].focus();
    } else {
      input.focus();
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

<div
  {id}
  class={['color-picker', 'drop-down', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <div bind:this={container} class="drop-down-input-container" class:focus>
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
