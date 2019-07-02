<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let size = "";
  export let value = 0;
  export let total = 100;

  $: percent = Math.min(value / total * 100, 100)
</script>

<div {id} class={['progress', type, size, className].filter(Boolean).join(' ')}>
  <div class="progress-bar" style={`width: ${percent}%`}/>
</div>
