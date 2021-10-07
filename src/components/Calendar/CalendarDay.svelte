<script>
  import { getContext, createEventDispatcher } from "svelte";
  import { areDatesEqual } from "../../utils/date-utils";

  export let id = null;
  let className = null;
  export { className as class };
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

<div {id} class={["calendar-day", className].filter(Boolean).join(" ")}>
  <div
    class="calendar-day-text"
    class:muted
    class:today={isToday()}
    class:active={selectable && active}
  >
    {#if selectable}
      <button
        class="button calendar-day-button"
        type="button"
        tabindex="-1"
        on:click={handleClick}
        on:keydown
      >
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

<style>
  /* These styles were automatically generated from CalendarDay.scss */
  .calendar-day {
    display: inline-block;
    text-align: center;
    vertical-align: top;
    width: 14.2857%;
  }

  .calendar-day-text {
    border-radius: var(--border-radius, 2px);
  }

  .calendar-day-text.muted {
    color: #CCCCCC;
  }

  .calendar-day-text.today {
    background-color: #0077DD;
    color: white;
  }

  .calendar-day-text.active {
    background-color: var(--select-color, #3396ff);
    color: var(--select-text-color, #fff);
  }

  .calendar-number {
    display: inline-block;
    padding: 0.8rem 0;
  }

  .calendar-day-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: inherit;
    margin: 0;
    min-width: 0;
    padding: 0;
    width: 100%;
  }

  .calendar-day-button:focus {
    background-color: transparent;
  }

  ul.calendar-event-list {
    line-height: 0.6rem;
    min-height: 0.6rem;
    margin: -4px 0 2px;
    padding: 0;
  }

  li.calendar-event {
    background-color: var(--select-color, #3396ff);
    border-radius: 50%;
    display: inline-block;
    margin: 0;
    height: 0.6rem;
    width: 0.6rem;
  }
</style>
