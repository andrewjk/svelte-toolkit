<script>
  import { onMount, beforeUpdate, setContext } from "svelte";

  export let id = null;
  export let className = null;
  export let type = "info";
  export let message = "";
</script>

<style>
  .notification.info {
    color: blue;
  }
  .notification.success {
    color: limegreen;
  }
  .notification.warning {
    color: orange;
  }
  .notification.danger {
    color: red;
  }
</style>

<div {id} class={['notification', className, type].filter(Boolean).join(' ')}>
  <slot>{message}</slot>
</div>
