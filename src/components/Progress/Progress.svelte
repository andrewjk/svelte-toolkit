<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let type = "info";
  export let size = "";
  export let value = 0;
</script>

<div {id} class={['progress', type, size, className].filter(Boolean).join(' ')}>
  <div class="progress-bar" style={`width: ${value}%`}/>
</div>
