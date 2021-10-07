<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  import ImageButton from "../ImageButton/ImageButton.svelte";
  import Cross from "../../icons/Cross/Cross.svelte";

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

<style>
  /* These styles were automatically generated from Notification.scss */
  .notification {
    background-color: var(--light-back-color, #fafafa);
    border: 1px solid var(--border-color, #d2d2d2);
    border-radius: var(--border-radius, 2px);
    display: inline-flex;
    margin: 0 0 var(--element-margin, 1.5rem);
    padding: calc(var(--element-padding, 2rem) / 2) var(--element-padding, 2rem);
    width: 100%;
  }

  .notification:last-child {
    margin: 0;
  }

  .notification-content {
    flex: 1 1 auto;
  }

  .notification-close {
    flex: 0 0 auto;
    margin-left: var(--element-margin, 1.5rem);
    margin-right: calc(var(--element-margin, 1.5rem) * -1 / 2);
  }

  .notification.primary :global(a),
  .notification.info :global(a),
  .notification.success :global(a),
  .notification.warning :global(a),
  .notification.danger :global(a) {
    color: inherit;
    border-bottom: 1px solid;
  }

  .notification.primary :global(a:hover),
  .notification.primary :global(a:focus),
  .notification.info :global(a:hover),
  .notification.info :global(a:focus),
  .notification.success :global(a:hover),
  .notification.success :global(a:focus),
  .notification.warning :global(a:hover),
  .notification.warning :global(a:focus),
  .notification.danger :global(a:hover),
  .notification.danger :global(a:focus) {
    border-bottom: 1px double;
  }

  .notification.primary.solid,
  .notification.info.solid,
  .notification.success.solid,
  .notification.warning.solid,
  .notification.danger.solid {
    border: 1px solid rgba(0, 0, 0, 0.06);
  }

  .notification.primary {
    background-color: var(--light-primary-color, #fff5fa);
    border: 1px solid var(--light-primary-border-color, #fd3f92);
    color: var(--light-primary-text-color, #f4036c);
  }

  .notification.primary.solid {
    background-color: var(--primary-color, #fd3f92);
    color: var(--primary-text-color, #fff);
  }

  .notification.info {
    background-color: var(--light-info-color, #f6f9ff);
    border: 1px solid var(--light-info-border-color, #4d90fe);
    color: var(--light-info-text-color, #0563fe);
  }

  .notification.info.solid {
    background-color: var(--info-color, #4d90fe);
    color: var(--info-text-color, #fff);
  }

  .notification.success {
    background-color: var(--light-success-color, #eefff6);
    border: 1px solid var(--light-success-border-color, #00a852);
    color: var(--light-success-text-color, #008340);
  }

  .notification.success.solid {
    background-color: var(--success-color, #00a852);
    color: var(--success-text-color, #fff);
  }

  .notification.warning {
    background-color: var(--light-warning-color, #fefcf5);
    border: 1px solid var(--light-warning-border-color, #f3c42e);
    color: var(--light-warning-text-color, #b28a0a);
  }

  .notification.warning.solid {
    background-color: var(--warning-color, #f3c42e);
    color: var(--warning-text-color, rgba(0, 0, 0, 0.7));
  }

  .notification.danger {
    background-color: var(--light-danger-color, #fef5f4);
    border: 1px solid var(--light-danger-border-color, #ee2e24);
    color: var(--light-danger-text-color, #c6180f);
  }

  .notification.danger.solid {
    background-color: var(--danger-color, #ee2e24);
    color: var(--danger-text-color, #fff);
  }
</style>
