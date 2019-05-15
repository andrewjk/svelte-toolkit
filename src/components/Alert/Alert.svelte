<script>
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
    color: green;
  }
  .alert.warning {
    color: orange;
  }
  .alert.danger {
    color: red;
  }
</style>

<div class={"alert " + type} role="alert">
  <slot>{message}</slot>
</div>
