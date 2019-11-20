<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
</script>

<style src="PageBody.scss">

</style>

<main
  {id}
  class={['page-body', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}>
  <slot />
</main>
