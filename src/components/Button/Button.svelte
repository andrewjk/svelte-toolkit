<script>
  export let type = "";
  export let size = "";
  export let content = "";
</script>

<button class={['button', type, size].filter(Boolean).join(' ')} on:click>
  <slot>{content}</slot>
</button>
