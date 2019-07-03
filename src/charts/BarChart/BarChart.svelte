<script>
  import { setContext, onMount, beforeUpdate } from "svelte";
  import ChartAxis from "../ChartAxis.svelte";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let width = 400;
  export let height = 200;

  const itemStates = [];

  const haxisBuffer = 20;
  const vaxisBuffer = 20;

  let itemWidth = 0;
  let valueHeight = 0;

  setContext("barchart", {
    // The registerItem function is called from each BarChartItem to register itself with this
    // BarChart. They pass us their value, as well as a setInfo method that we can call in onMount
    // and beforeUpdate, when we have all of the items and can calculate sizes and (default) colors
    registerItem: (value, label, setInfo) => {
      itemStates.push({ value, label, setInfo });
    }
  });

  onMount(() => {
    setSizes();
  });

  beforeUpdate(() => {
    setSizes();
  });

  function setSizes() {
    if (itemStates.length) {
      const maxValue = itemStates.reduce(
        (a, b) => Math.max(a, parseInt(b.value)),
        0
      );

      itemWidth = (width - vaxisBuffer) / itemStates.length / 2;
      valueHeight = (height - haxisBuffer) / maxValue;

      for (let i = 0; i < itemStates.length; i++) {
        const state = itemStates[i];
        const itemHeight = state.value * valueHeight - 20;
        const itemx = 20 + i * itemWidth * 2 + itemWidth / 2;
        const itemy = height - 20;
        state.setInfo(itemx, itemy, itemWidth, itemHeight, chartColors[0]);
      }
    }
  }
</script>

<svg
  {id}
  class={['chart', className]
    .concat(classNames)
    .filter(Boolean)
    .join(' ')}
  version="1.1"
  {width}
  {height}>
  <g>
    {#if itemStates.length}
      <ChartAxis
        labels={itemStates.map(item => item.label)}
        x1={vaxisBuffer}
        y1={height - haxisBuffer}
        x2={width}
        y2={height - haxisBuffer}
        itemWidth={itemWidth * 2}
        type="bar" />
      <ChartAxis
        x1={vaxisBuffer}
        y1={height - haxisBuffer}
        x2={vaxisBuffer}
        y2={0} />
    {/if}
    <slot />
  </g>
</svg>
