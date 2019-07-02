<script>
  import { getContext } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };
  export let value = 0;
  export let color = "";

  let size = 0;
  let radius = 0;
  let startAngle = 0;
  let endAngle = 0;

  $: path = buildPath(size, radius, startAngle, endAngle);

  // Register this item with the parent PieChart, which will set our angles and default color
  const { registerItem } = getContext("piechart");
  registerItem(value, setInfo);

  function setInfo(newSize, newRadius, newStartAngle, newEndAngle, newFill) {
    size = newSize;
    radius = newRadius;
    startAngle = newStartAngle;
    endAngle = newEndAngle;
    if (!color) {
      color = newFill;
    }
  }

  function buildPath(pathSize, pathRadius, pathStartAngle, pathEndAngle) {
    // HACK: Drawing an arc of 360 degrees doesn't work
    if (pathStartAngle === 0 && pathEndAngle === 360) {
      pathEndAngle = 359.9999;
    }

    const x = pathSize / 2;
    const y = pathSize / 2;

    // Use some trig to find the points on the circumference at the start and end angles
    const startx = x + pathRadius * Math.sin((Math.PI * pathStartAngle) / 180);
    const starty = y + pathRadius * Math.cos((Math.PI * pathStartAngle) / 180);

    const endx = x + pathRadius * Math.sin((Math.PI * pathEndAngle) / 180);
    const endy = y + pathRadius * Math.cos((Math.PI * pathEndAngle) / 180);

    const largeArc = pathEndAngle - pathStartAngle > 180 ? 1 : 0;

    // Build the path - move to the origin, line to the start angle on the circumference,
    // arc to the end angle on the circumference, and then close back to the start
    return `M${x},${y} L${startx},${starty} A${radius},${radius} 0 ${largeArc} 0 ${endx},${endy} Z`;
  }
</script>

<path
  {id}
  class={['chart-segment', className].filter(Boolean).join(' ')}
  d={path}
  fill={color} />
