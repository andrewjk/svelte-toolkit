<script>
  export let id = null;
  let className = null;
  export { className as class };

  export let value = null;
  export let interval = 30;
  export let placeholder = "";

  const times = buildTimes();

  function buildTimes() {
    const options = {
      hour: "numeric",
      minute: "numeric"
    };
    const formatter = new Intl.DateTimeFormat([], options);

    let date = new Date(new Date().toDateString());
    let day = date.getDay();
    let timeValues = [];
    while (date.getDay() === day) {
      timeValues.push({
        value: getMinutes(date),
        text: formatter.format(date)
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

<style src="TimePicker.scss">

</style>

<select
  {id}
  class={['time-picker', className].filter(Boolean).join(' ')}
  value={getMinutes(value)}
  {placeholder}
  on:change={handleChange}>
  {#each times as time}
    <option value={time.value}>{time.text}</option>
  {/each}
</select>
