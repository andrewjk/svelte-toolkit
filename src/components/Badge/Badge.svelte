<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let boxed = false;
  export let content = "";
</script>

<span {id} class={['badge', type, className].filter(Boolean).join(' ')} class:boxed>
  <slot>{content}</slot>
</span>
