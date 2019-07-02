<script>
  import { setContext, onMount, beforeUpdate } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let size = 200;
  export let radius = size / 2;

  const itemStates = [];

  // Colors from http://colorbrewer2.org/
  const colors = [
    "#A6CEE3",
    "#B2DF8A",
    "#FB9A99",
    "#FDBF6F",
    "#CAB2D6",
    "#FFFF99",
    "#1F78B4",
    "#33A02C",
    "#E31A1C",
    "#FF7F00",
    "#6A3D9A",
    "#B15928"
  ];

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
      const totalValue = itemStates.reduce((a, b) => a + parseInt(b.value), 0);
      let angle = 0;
      for (let i = 0; i < itemStates.length; i++) {
        const state = itemStates[i];
        const startAngle = angle;
        const endAngle = angle + (state.value / totalValue) * 360;
        state.setInfo(size, radius, startAngle, endAngle, colors[i % colors.length]);
        angle = endAngle;
      }
    }
  }
</script>

<svg
  {id}
  class={['chart', className].filter(Boolean).join(' ')}
  version="1.1"
  width={size}
  height={size}>
  <g transform={`translate(0,${size}) scale(1,-1)`}>
    <slot />
  </g>
</svg>
