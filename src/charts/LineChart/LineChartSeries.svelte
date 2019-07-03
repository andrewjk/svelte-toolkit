<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let values = [];
  export let labels = [];
  export let color = "";

  let hBuffer = 0;
  let vBuffer = 0;

  let height = 0;
  let itemWidth = 0;
  let valueHeight = 0;

  $: points = buildPoints(hBuffer, vBuffer, height, itemWidth, valueHeight);

  // Register this item with the parent LineChart, which will set our sizes and default color
  const { registerItem } = getContext("linechart");
  registerItem(values, labels, setInfo);

  function setInfo(
    newHBuffer,
    newVBuffer,
    newHeight,
    newItemWidth,
    newValueHeight,
    newColor
  ) {
    hBuffer = newHBuffer;
    vBuffer = newVBuffer;
    height = newHeight;
    itemWidth = newItemWidth;
    valueHeight = newValueHeight;
    if (!color) {
      color = newColor;
    }
  }

  function buildPoints(newHBuffer, newVBuffer, newHeight, newItemWidth, newValueHeight) {
    return values
      .map((value, index) => {
        const x = index * newItemWidth + newHBuffer;
        const y = height - value * newValueHeight;
        return `${x},${y}`;
      })
      .join("\n");
  }
</script>

<polyline
  {id}
  class={['chart-line', className].concat(classNames).filter(Boolean).join(' ')}
  {points}
  stroke={color}
  fill="none" />
