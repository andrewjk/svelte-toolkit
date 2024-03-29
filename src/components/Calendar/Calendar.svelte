<script>
  import { setContext, afterUpdate, createEventDispatcher } from "svelte";
  import { areDatesEqual } from "../../utils/date-utils";
  import { keyCodes } from "../../utils/key-codes";

  import CalendarDay from "./CalendarDay.svelte";
  import ImageButton from "../ImageButton/ImageButton.svelte";
  import ChevronLeft from "../../icons/ChevronLeft/ChevronLeft.svelte";
  import ChevronRight from "../../icons/ChevronRight/ChevronRight.svelte";

  export let id = null;
  let className = null;
  export { className as class };

  export let startOfWeek = 1;
  export let selectable = false;
  export let value = new Date();

  // Events can have { date, content, color }
  export let events = [];

  // A note on dates:
  // * value is the selected value
  // * activeDate is the date that is active when the user is navigating via keyboard
  // * visibleDate is the date that is currently being displayed in the calendar (really only the month part is important here)
  let activeDate = value;
  let visibleDate = value;

  let visibleStartDate = value;
  let visibleEndDate = value;
  let container = null;
  let refocus = false;

  $: days = buildDays(visibleDate, startOfWeek);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];

  const dispatch = createEventDispatcher();

  setContext("calendar", {
    // The registerItem function is called from each CalendarDay to register itself with this
    // Calendar. They pass us a setActive method that we can call
    registerDay: (date, setActive) => {
      days.find((day) => areDatesEqual(day.date, date)).setActive = setActive;
    },
  });

  afterUpdate(() => {
    if (refocus) {
      refocus = false;
      const el = container.getElementsByClassName("active")[0];
      if (el) {
        el.childNodes[0].focus();
      }
    }
  });

  function buildDays(date, start) {
    const newDays = [];

    // Set the first day to the start of the week before the first day of the month (e.g. Monday the
    // 28th of the previous month)
    visibleStartDate = new Date();
    visibleStartDate.setFullYear(date.getFullYear(), date.getMonth(), 1);
    visibleStartDate.setDate(
      visibleStartDate.getDate() - ((visibleStartDate.getDay() + 7 - start) % 7)
    );

    // Set the last day to the end of the week after the last day of the month (e.g. Sunday the 6th
    // of the next month)
    visibleEndDate = new Date();
    visibleEndDate.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
    visibleEndDate.setDate(
      visibleEndDate.getDate() + ((start - 1 - visibleEndDate.getDay() + 7) % 7)
    );

    const dayDiff =
      Math.round((visibleEndDate - visibleStartDate) / (1000 * 60 * 60 * 24)) +
      1;

    for (let i = 0; i < dayDiff; i++) {
      const dayDate = new Date();
      dayDate.setFullYear(
        visibleStartDate.getFullYear(),
        visibleStartDate.getMonth(),
        visibleStartDate.getDate() + i
      );
      dayDate.setHours(0);
      dayDate.setMinutes(0);
      dayDate.setSeconds(0);
      dayDate.setMilliseconds(0);
      newDays.push({
        date: dayDate,
        muted: dayDate.getMonth() !== date.getMonth(),
        active: areDatesEqual(dayDate, new Date(activeDate)),
      });
    }

    return newDays;
  }

  function setValue(date) {
    value = date;

    // Also set the active date so that the user knows where they are
    setActiveDate(date);

    dispatch("change", value);
  }

  function setActiveDate(date) {
    activeDate = date;

    // If the selected date is outside the visible date range, move the date range
    if (activeDate < visibleStartDate || activeDate > visibleEndDate) {
      refocus = true;
      visibleDate = activeDate;
      dispatch("changedate", visibleDate);
    }

    days.forEach((day) => {
      const active = areDatesEqual(day.date, new Date(activeDate));
      day.setActive(active);
      day.active = active;
    });
  }

  function handleFocus(e) {
    const el = e.target.getElementsByClassName("active")[0];
    if (el) {
      el.childNodes[0].focus();
      e.preventDefault();
    }
  }

  function handlePrevMonth(e) {
    e.preventDefault();
    visibleDate = new Date(visibleDate.setMonth(visibleDate.getMonth() - 1));
    dispatch("changedate", visibleDate);
  }

  function handleNextMonth(e) {
    e.preventDefault();
    visibleDate = new Date(visibleDate.setMonth(visibleDate.getMonth() + 1));
    dispatch("changedate", visibleDate);
  }

  async function handleDayClick(date) {
    if (!selectable) {
      return;
    }

    setValue(date.detail);
  }

  function handleKey(e) {
    if (!selectable) {
      return;
    }

    switch (e.keyCode) {
      case keyCodes.enter: {
        e.preventDefault();
        setValue(activeDate);
        break;
      }
      case keyCodes.esc: {
        e.preventDefault();
        dispatch("close");
        break;
      }
      case keyCodes.left: {
        e.preventDefault();
        // Move to the date one day before
        const newDate = activeDate ? new Date(activeDate) : new Date();
        setActiveDate(
          new Date(newDate.setTime(newDate.getTime() - 1 * 86400000))
        );
        break;
      }
      case keyCodes.up: {
        e.preventDefault();
        // Move to the date seven days before
        const newDate = activeDate ? new Date(activeDate) : new Date();
        setActiveDate(
          new Date(newDate.setTime(newDate.getTime() - 7 * 86400000))
        );
        break;
      }
      case keyCodes.right: {
        e.preventDefault();
        // Move to the date one day after
        const newDate = activeDate ? new Date(activeDate) : new Date();
        setActiveDate(
          new Date(newDate.setTime(newDate.getTime() + 1 * 86400000))
        );
        break;
      }
      case keyCodes.down: {
        e.preventDefault();
        // Move to the date seven days after
        const newDate = activeDate ? new Date(activeDate) : new Date();
        setActiveDate(
          new Date(newDate.setTime(newDate.getTime() + 7 * 86400000))
        );
        break;
      }
    }
  }
</script>

<div
  {id}
  class={["calendar", className].filter(Boolean).join(" ")}
  bind:this={container}
  tabindex={selectable ? "0" : "-1"}
  on:focus={handleFocus}
>
  <div class="calendar-header">
    <span class="calendar-nav">
      <ImageButton on:click={handlePrevMonth}>
        <slot name="prev-button">
          <ChevronLeft />
        </slot>
      </ImageButton>
    </span>
    <span class="calendar-title">
      {months[visibleDate.getMonth()] + " " + visibleDate.getFullYear()}
    </span>
    <span class="calendar-nav">
      <ImageButton on:click={handleNextMonth}>
        <slot name="next-button">
          <ChevronRight />
        </slot>
      </ImageButton>
    </span>
  </div>
  <div class="calendar-body">
    {#each [0, 1, 2, 3, 4, 5, 6] as index}
      <span class="calendar-day-header">
        {weekdays[(Math.abs(startOfWeek) + index) % 7].substring(0, 2)}
      </span>
    {/each}
    {#each days as day, index (day.date)}
      <CalendarDay
        date={day.date}
        muted={day.muted}
        active={day.active}
        {selectable}
        events={events.filter((ev) =>
          areDatesEqual(new Date(ev.date), day.date)
        )}
        on:click={handleDayClick}
        on:keydown={handleKey}
      />
    {/each}
  </div>
</div>

<style>
  /* These styles were automatically generated from Calendar.scss */
  .calendar {
    display: inline-block;
    margin: 0 0 var(--element-margin, 1.5rem);
  }

  .calendar:last-child {
    margin: 0;
  }

  .calendar-header {
    padding: 0.8rem 0;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .calendar-body {
    margin: 0 0 var(--element-margin, 1.5rem);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: top;
  }

  .calendar-body:last-child {
    margin: 0;
  }

  .calendar-nav {
    display: inline-block;
    font-size: 2rem;
    font-weight: bold;
    line-height: 2rem;
    text-align: center;
    width: 14.2857%;
  }

  .calendar-title {
    display: inline-block;
    font-size: var(--font-size-title, 1.6rem);
    text-align: center;
    width: 71.4285%;
  }

  .calendar-day-header {
    display: inline-block;
    font-weight: bold;
    padding: 0.8rem 0;
    text-align: center;
    vertical-align: top;
    width: 14.2857%;
  }
</style>
