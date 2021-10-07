<script>
  import { setContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let spaced = null;
  export let collapse = null;

  setContext("level", {
    spaced,
    collapse,
  });
</script>

<div {id} class={["level", className].filter(Boolean).join(" ")} class:collapse>
  <slot />
</div>

<style>
  /* These styles were automatically generated from Level.scss */
  .level {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 480px) {
    .level.collapse {
      flex-direction: column;
    }
  }
</style>
