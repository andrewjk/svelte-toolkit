<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "";
</script>

<style>
  /* These styles were automatically generated from TableRow.scss */
  
</style>

<tr
  {id}
  class={[type, className].filter(Boolean).join(' ')}>
  <slot />
</tr>
