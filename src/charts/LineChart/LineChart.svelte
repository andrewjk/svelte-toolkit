<script>
  import { setContext, onMount, beforeUpdate } from "svelte";
  import ChartAxis from "../ChartAxis/ChartAxis";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let width = 400;
  export let height = 200;

  const itemStates = [];

  const hBuffer = 20;
  const vBuffer = 20;

  let itemWidth = 0;
  let valueHeight = 0;

  setContext("linechart", {
    // The registerItem function is called from each LineChartItem to register itself with this
    // LineChart. They pass us their values, as well as a setInfo method that we can call in onMount
    // and beforeUpdate, when we have all of the items and can calculate sizes and (default) colors
    registerItem: (values, labels, setInfo) => {
      itemStates.push({ values, labels, setInfo });
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
      const maxNumber = itemStates.reduce(
        (a, b) => Math.max(a, b.values.length),
        0
      );
      // HACK: Yeah, nested reduces
      const maxValue = itemStates.reduce(
        (a, b) =>
          Math.max(a, parseInt(b.values.reduce((a, b) => Math.max(a, b), 0))),
        0
      );

      itemWidth = (width - vBuffer) / (maxNumber - 1);
      valueHeight = (height - hBuffer) / maxValue;

      for (let i = 0; i < itemStates.length; i++) {
        const state = itemStates[i];
        state.setInfo(
          hBuffer,
          vBuffer,
          height,
          itemWidth,
          valueHeight,
          chartColors[i % chartColors.length]
        );
      }
    }
  }
</script>

<style src="LineChart.scss">

</style>

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
        labels={itemStates[0].labels}
        x1={vBuffer}
        y1={height - hBuffer}
        x2={width}
        y2={height - hBuffer}
        {itemWidth}
        type="line" />
      <ChartAxis x1={vBuffer} y1={height - hBuffer} x2={vBuffer} y2={0} />
    {/if}
    <slot />
  </g>
</svg>
