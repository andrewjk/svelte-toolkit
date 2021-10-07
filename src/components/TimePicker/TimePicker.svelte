<script>
  import { onMount } from "svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let value = null;
  export let interval = 30;
  export let placeholder = "";
  export let autofocus = false;

  const times = buildTimes();
  let input;

  onMount(() => {
    // We're manually focussing in onMount for two reasons:
    // 1. to avoid an overly-broad accessibility warning (there are instances where autofocus is desirable)
    // 2. to enable autofocus when an item is dynamically added to a page (e.g. adding a new item at the bottom of a list)
    if (autofocus) {
      input.focus();
    }
  });

  function buildTimes() {
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat([], options);

    let date = new Date(new Date().toDateString());
    let day = date.getDay();
    let timeValues = [];
    while (date.getDay() === day) {
      timeValues.push({
        value: getMinutes(date),
        text: formatter.format(date),
      });
      date = new Date(date.getTime() + interval * 60 * 1000);
    }

    return timeValues;
  }

  function getMinutes(time) {
    const date = new Date(time);
    return date.getHours() * 60 + date.getMinutes();
  }

  function handleChange(e) {
    const date = new Date(new Date(value).toDateString());
    const milliseconds = e.target.value * 60 * 1000;
    value = new Date(date.getTime() + milliseconds);
  }
</script>

<select
  {id}
  class={["time-picker", className].filter(Boolean).join(" ")}
  value={getMinutes(value)}
  bind:this={input}
  {placeholder}
  on:change={handleChange}
>
  {#each times as time}
    <option value={time.value}>{time.text}</option>
  {/each}
</select>

<style>
  /* These styles were automatically generated from TimePicker.scss */
  
</style>
