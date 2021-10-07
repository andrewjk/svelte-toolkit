<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let position = null;

  let spaced = false;
  let collapse = false;

  const context = getContext("level");
  if (context) {
    spaced = context.spaced;
    collapse = context.collapse;
  }
</script>

<div
  {id}
  class={["level-item", position, className].filter(Boolean).join(" ")}
  class:spaced
  class:collapse
>
  <slot />
</div>

<style>
  /* These styles were automatically generated from LevelItem.scss */
  .level-item {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .level-item.start {
    flex: 0 0 auto;
    justify-content: flex-start;
  }

  .level-item.end {
    flex: 0 0 auto;
    justify-content: flex-end;
  }

  .level-item.spaced {
    margin: 0 calc(var(--element-margin, 1.5rem) / 2);
  }

  .level-item.spaced:first-child {
    margin-left: 0;
  }

  .level-item.spaced:last-child {
    margin-right: 0;
  }

  @media (max-width: 480px) {
    .level-item.collapse {
      margin: 0;
    }
    .level-item.collapse.spaced {
      margin: calc(var(--element-margin, 1.5rem) / 2) 0;
    }
  }
</style>
