<script>
  import { onMount, beforeUpdate, setContext } from "svelte";

  export let type = "info";
  export let message = "";
</script>

<style>
  .notification.info {
    color: blue;
  }
  .notification.success {
    color: green;
  }
  .notification.warning {
    color: orange;
  }
  .notification.danger {
    color: red;
  }
</style>

<div class={"notification " + type}>
  <slot>{message}</slot>
</div>
