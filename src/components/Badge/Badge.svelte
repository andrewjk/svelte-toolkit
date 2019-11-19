<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let type = "info";
  export let content = "";
</script>

<style src="Badge.scss">

</style>

<span {id} class={['badge', type, className].concat(classNames).filter(Boolean).join(' ')}>
  <slot>{content}</slot>
</span>
