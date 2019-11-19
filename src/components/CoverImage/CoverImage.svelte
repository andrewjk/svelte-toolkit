<script>
  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];

  export let src = "";
  export let position = "";
  export let repeat = "";
  export let size = "";
  export let height = "";
  export let width = "";
  export let alt = "";

  $: style = buildStyle(src, position, repeat, size, height, width);

  function buildStyle(src, position, repeat, size, height, width) {
    let style = `background-image: url('${src}')`;
    if (position) {
      style = style + `; background-position: ${position};`;
    }
    if (repeat) {
      style = style + `; background-repeat: ${repeat};`;
    }
    if (size) {
      style = style + `; background-size: ${size};`;
    }
    if (height) {
      style = style + `; height: ${height};`;
    }
    if (width) {
      style = style + `; width: ${width};`;
    }
    return style;
  }
</script>

<style src="CoverImage.scss">

</style>

<div
  {id}
  class={['cover-image', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  {style}
  role="img"
  aria-label={alt} />
