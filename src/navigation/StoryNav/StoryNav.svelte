<script>
  import { createEventDispatcher } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let index = 0;
  export let itemCount = 0;
  export let type = "";

  const dispatch = createEventDispatcher();

  $: indexes = buildIndexes(itemCount);

  function setIndex(value) {
    if (value !== index && value >= 0 && value < itemCount) {
      index = value;
      dispatch("change", index);
    }
  }

  function buildIndexes(count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(i);
    }
    return result;
  }

  function handleFocus(e) {
    const el = e.target.getElementsByTagName("button")[0];
    if (el) {
      el.focus();
    }
  }

  function handleKey(e) {
    switch (e.keyCode) {
      case keyCodes.left: {
        e.preventDefault();
        setIndex(index - 1);
        break;
      }
      case keyCodes.right: {
        e.preventDefault();
        setIndex(index + 1);
        break;
      }
    }
  }
</script>

{#if itemCount > 0}
  <div
    {id}
    class={["story-nav", type, className].filter(Boolean).join(" ")}
    on:focus={handleFocus}
    on:keydown={handleKey}
    tabindex="0"
  >
    {#each indexes as idx}
      <button
        class="button story-button"
        class:active={idx <= index}
        type="button"
        on:click={(e) => setIndex(idx)}
        tabindex="-1"
      />
    {/each}
  </div>
{/if}

<style>
  /* These styles were automatically generated from StoryNav.scss */
  .button {
    background-color: var(--button-back-color, #fff);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    color: var(--button-text-color, rgba(0, 0, 0, 0.7));
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .button:focus {
    background-color: var(--button-hover-color, #cccccc);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    outline: 0;
  }

  .button:hover {
    background-color: var(--button-hover-color, #cccccc);
  }

  /* Remove the black dotted focus border in Firefox */
  .button::-moz-focus-inner {
    border: 0;
  }

  .story-nav {
    padding: calc(var(--element-padding, 2rem) / 2) 0;
    display: flex;
  }

  .story-button {
    background-color: var(--dark-back-color, #888);
    border: 0;
    cursor: pointer;
    display: inline-block;
    height: 4px;
    min-width: 0;
    margin: 0 3px;
    padding: 0;
    flex: 1 1 auto;
  }

  .story-button.active {
    background-color: white;
  }

  .story-button:focus,
  .story-button:hover {
    box-shadow: revert;
  }

  .story-nav.vertical {
    display: block;
  }

  .story-nav.vertical .story-button {
    display: block;
    margin: calc(var(--element-margin, 1.5rem) / 2) 0;
    width: 100%;
  }
</style>
