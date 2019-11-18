<script>
  import { createEventDispatcher } from "svelte";
  import { keyCodes } from "../../utils/key-codes";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
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

<style src="DotNav.scss" global>

</style>

{#if itemCount > 0}
  <div
    {id}
    class={['dot-nav', type, className]
      .concat(classNames)
      .filter(Boolean)
      .join(' ')}
    on:focus={handleFocus}
    on:keydown={handleKey}
    tabindex="0">
    {#each indexes as idx}
      <button
        class="button dot-button"
        class:active={idx === index}
        type="button"
        on:click={e => setIndex(idx)}
        tabindex="-1" />
    {/each}
  </div>
{/if}
