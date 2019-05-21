<script>
  export let id = null;
  export let className = null;
  export let type = "info";
  export let message = "";
</script>

<style>
  .alert {
    position: fixed;
    top: 50px;
    left: 50px;
  }

  .alert.info {
    color: blue;
  }
  .alert.success {
    color: limegreen;
  }
  .alert.warning {
    color: orange;
  }
  .alert.danger {
    color: red;
  }
</style>

<div
  {id}
  class={['alert', type, className].filter(Boolean).join(' ')}
  role="alert">
  <slot>{message}</slot>
</div>
