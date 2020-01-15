<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  //export let value = 0;
  //export let label = "";
  export let color = "";

  export let x = 0;
  export let y = 0;
  export let width = 20;
  export let height = 0;

  /*// Register this item with the parent BarChart, which will set our sizes and default color
  const { registerItem } = getContext("barchart");
  registerItem(value, label, setInfo);

  function setInfo(newx, newy, newWidth, newHeight, newColor) {
    x = newx;
    y = newy;
    width = newWidth;
    height = newHeight;
    if (!color) {
      color = newColor;
    }
  }*/
</script>

<rect
  {id}
  class={['chart-bar', className].filter(Boolean).join(' ')}
  {x}
  y={y - height}
  {width}
  {height}
  fill={color} />
