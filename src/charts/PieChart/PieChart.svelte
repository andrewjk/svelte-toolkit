<script>
  import { setContext, onMount, beforeUpdate } from "svelte";
  import { chartColors } from "../../utils/chart-colors";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let size = 200;
  export let radius = size / 2;

  const itemStates = [];

  setContext("piechart", {
    // The registerItem function is called from each PieChartItem to register itself with this
    // PieChart. They pass us their value, as well as a setInfo method that we can call in onMount
    // and beforeUpdate, when we have all of the items and can calculate sizes and (default) colors
    registerItem: (value, setInfo) => {
      itemStates.push({ value, setInfo });
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
      const x = size / 2;
      const y = size / 2;
      const totalValue = itemStates.reduce((a, b) => a + parseInt(b.value), 0);
      let angle = 0;
      for (let i = 0; i < itemStates.length; i++) {
        const state = itemStates[i];
        const startAngle = angle;
        const endAngle = angle + (state.value / totalValue) * 360;
        state.setInfo(
          x,
          y,
          radius,
          startAngle,
          endAngle,
          chartColors[i % chartColors.length]
        );
        angle = endAngle;
      }
    }
  }
</script>

<style src="PieChart.scss" global>

</style>

<svg
  {id}
  class={['chart', className].concat(classNames).filter(Boolean).join(' ')}
  version="1.1"
  width={size}
  height={size}>
  <g transform={`translate(0,${size}) scale(1,-1)`}>
    <slot />
  </g>
</svg>
