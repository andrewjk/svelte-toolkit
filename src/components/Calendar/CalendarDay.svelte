<script>
  import { createEventDispatcher } from "svelte";
  import { areDatesEqual } from "../../utils/date-utils";

  export let id = null;
  export let className = null;
  export let date = new Date();
  export let selectable = false;
  export let muted = false;
  export let active = false;
  export let events = [];

  const dispatch = createEventDispatcher();

  function isToday() {
    const today = new Date();
    return areDatesEqual(date, today);
  }

  function handleClick() {
    dispatch("click", date);
  }
</script>

<div
  {id}
  class={['calendar-day', className].filter(Boolean).join(' ')}
  class:muted
  class:active
  class:today={isToday()}
  on:click>
  {#if selectable}
    <button class="button calendar-day-button" on:click={handleClick}>{date.getDate()}</button>
  {:else}{date.getDate()}{/if}
  <ul class="calendar-event-list">
    {#each events as ev}
      <li class="calendar-event" title={ev.text} />
    {/each}
  </ul>
</div>