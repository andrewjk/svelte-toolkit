<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import ImageButton from "../ImageButton/ImageButton";
  import Cross from "../../icons/Cross";

  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let content = "";
  export let closable = false;
  export let duration = -1;
  export let solid = false;

  const dispatch = createEventDispatcher();

  let visible = true;

  onMount(() => {
    if (duration > 0) {
      setTimeout(close, duration);
    }
  });

  function close() {
    visible = false;
    dispatch("closed");
  }
</script>

{#if visible}
  <div
    {id}
    class={["notification", type, solid ? "solid" : null, className]
      .filter(Boolean)
      .join(" ")}
    out:fade={{ duration: duration > 0 ? 400 : 0 }}
  >
    <div class="notification-content">
      <slot>{content}</slot>
    </div>
    {#if closable}
      <div class="notification-close">
        <ImageButton size="small" on:click={close}>
          <slot name="button">
            <Cross />
          </slot>
        </ImageButton>
      </div>
    {/if}
  </div>
{/if}

<style src="Notification.scss">
</style>
