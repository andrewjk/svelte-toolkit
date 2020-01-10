<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "";
</script>

<style src="TableRow.scss">

</style>

<tr
  {id}
  class={[type, className].filter(Boolean).join(' ')}>
  <slot />
</tr>
