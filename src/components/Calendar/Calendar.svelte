<script>
  import { createEventDispatcher } from "svelte";
  import { areDatesEqual } from "../../utils/date-utils";

  import CalendarDay from "./CalendarDay.svelte";
  import ArrowLeft from "../Icons/ArrowLeft.svelte";
  import ArrowRight from "../Icons/ArrowRight.svelte";

  export let id = null;
  export let className = null;
  export let startOfWeek = 1;
  export let selectable = false;
  export let value = new Date();
  // Events can have { date, content, color }
  export let events = [];

  let activeDate = new Date();

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const dispatch = createEventDispatcher();

  function getDays() {
    const days = [];

    // Set the first day to the start of the week before the first day of the month (e.g. Monday the
    // 28th of the previous month)
    const startOfMonth = new Date();
    startOfMonth.setFullYear(
      activeDate.getFullYear(),
      activeDate.getMonth(),
      1
    );
    startOfMonth.setDate(
      startOfMonth.getDate() - ((startOfMonth.getDay() + 7 - startOfWeek) % 7)
    );

    // Set the last day to the end of the week after the last day of the month (e.g. Sunday the 6th
    // of the next month)
    const endOfMonth = new Date();
    endOfMonth.setFullYear(
      activeDate.getFullYear(),
      activeDate.getMonth() + 1,
      0
    );
    endOfMonth.setDate(
      endOfMonth.getDate() + ((startOfWeek - 1 - endOfMonth.getDay() + 7) % 7)
    );

    const dayDiff =
      Math.round((endOfMonth - startOfMonth) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < dayDiff; i++) {
      const date = new Date();
      date.setFullYear(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth(),
        startOfMonth.getDate() + i
      );
      date.setHours(9);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      days.push(date);
    }

    return days;
  }

  function handlePrevMonth(e) {
    e.preventDefault();
    activeDate = new Date(activeDate.setMonth(activeDate.getMonth() - 1));
  }

  function handleNextMonth(e) {
    e.preventDefault();
    activeDate = new Date(activeDate.setMonth(activeDate.getMonth() + 1));
  }

  function handleDayClick(date) {
    // TODO: Something's not right here!
    value = date.detail;
    dispatch("change", date);
  }
</script>

<div {id} class={['calendar', className].filter(Boolean).join(' ')}>
  <div class="calendar-header">
    <span class="calendar-nav">
      <button type="button" class="icon-button" on:click={handlePrevMonth}>
        <ArrowLeft />
      </button>
    </span>
    <span class="calendar-title">
       {months[activeDate.getMonth()] + ' ' + activeDate.getFullYear()}
    </span>
    <span class="calendar-nav">
      <button type="button" class="icon-button" on:click={handleNextMonth}>
        <ArrowRight />
      </button>
    </span>
  </div>
  <div class="calendar-body">
    {#each [0, 1, 2, 3, 4, 5, 6] as index}
      <span class="calendar-day calendar-day-header">
         {weekdays[(Math.abs(startOfWeek) + index) % 7].substring(0, 2)}
      </span>
    {/each}
    {#each getDays() as day (day)}
      <CalendarDay
        muted={day.getMonth() !== activeDate.getMonth()}
        date={day}
        active={selectable && areDatesEqual(day, new Date(value))}
        {selectable}
        events={events.filter(ev => areDatesEqual(new Date(ev.date), day))}
        on:click={handleDayClick} />
    {/each}
  </div>
</div>
