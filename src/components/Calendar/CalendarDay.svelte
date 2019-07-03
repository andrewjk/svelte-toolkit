<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { areDatesEqual } from "../../utils/date-utils";

  export let id = null;
  let className = null;
  export { className as class };
  export let classNames = [];
  export let date = new Date();
  export let selectable = false;
  export let muted = false;
  export let active = false;
  export let events = [];

  const dispatch = createEventDispatcher();

  // Register this item with the parent Calendar, which will handle toggling active for all days
  const { registerDay } = getContext("calendar");
  registerDay(date, setActive);

  // This function is called by the parent Calendar to set this item's active value
  function setActive(value) {
    if (active !== value) {
      active = value;
      dispatch("activeChange", value);
    }
  }
  
  function isToday() {
    const today = new Date();
    return areDatesEqual(date, today);
  }

  async function handleClick(e) {
    dispatch("click", date);
  }
</script>

<div
  {id}
  class={['calendar-day', className].concat(classNames).filter(Boolean).join(' ')}>
  <div
    class="calendar-day-text"
    class:muted
    class:today={isToday()}
    class:active={selectable && active}>
    {#if selectable}
      <button
        class="button calendar-day-button"
        tabindex="-1"
        on:click={handleClick}
        on:keydown>
        <span class="calendar-number">{date.getDate()}</span>
      </button>
    {:else}
      <span class="calendar-number">{date.getDate()}</span>
    {/if}
  </div>
  <ul class="calendar-event-list">
    {#each events as ev}
      <li class="calendar-event" title={ev.content} />
    {/each}
  </ul>
</div>
