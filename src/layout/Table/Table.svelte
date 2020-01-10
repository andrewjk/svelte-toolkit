<script>
  export let id = null;
  let className = null;
  export { className as class };
  
  export let type = "";
</script>

<style src="Table.scss">

</style>

<table
  {id}
  class={['table', type, className].filter(Boolean).join(' ')}>
  <slot />
</table>
