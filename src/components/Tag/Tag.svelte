<script>
  import { createEventDispatcher } from "svelte";

  import ImageButton from "../ImageButton/ImageButton.svelte";
  import Cross from "../../icons/Cross/Cross.svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let type = "info";
  export let content = "";
  export let closable = false;

  const dispatch = createEventDispatcher();

  let visible = true;

  function close() {
    visible = false;
    dispatch("close");
  }
</script>

{#if visible}
  <span {id} class={["tag", type, className].filter(Boolean).join(" ")}>
    <slot>{content}</slot>
    {#if closable}
      <div class="tag-close">
        <ImageButton size="small" on:click={close}>
          <slot name="button">
            <Cross />
          </slot>
        </ImageButton>
      </div>
    {/if}
  </span>
{/if}

<style src="Tag.scss">
</style>
