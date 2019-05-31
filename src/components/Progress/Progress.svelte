<script>
  export let id = null;
  export let className = null;
  export let type = "info";
  export let size = "";
  export let value = 0;
</script>

<div {id} class={['progress', type, size, className].filter(Boolean).join(' ')}>
  <div class="progress-bar" style={`width: ${value}%`}/>
</div>
