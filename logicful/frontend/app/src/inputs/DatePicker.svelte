<script lang="typescript">
  import { subscribeFieldChange } from "@app/event/FieldEvent";
  import { DateTime } from "luxon";

  import type { IField } from "@app/models/IField";
  import formStore from "@app/store/FormStore";
  import { debounce } from "@app/util/Debounce";
  import { onMount } from "svelte";
  import Label from "../inputs/Label.svelte";
  export let field: IField;

  let date: string;
  let time: string;
  let value: DateTime | undefined;
  let timeRangeFrom: string;
  let timeRangeTo: string;
  let dateRangeFrom: string;
  let dateRangeTo: string;
  let atDateLimit: boolean;
  let atDateBeforeLimit: boolean;

  let debouncedOnChange: any;

  subscribeFieldChange(onMount, (newField) => {
    if (newField.id === field.id) {
      if (newField.rangeFrom || newField.rangeTo) {
        setTimeRange(field);
      }
      if (newField.value) {
        value = DateTime.fromMillis(newField.value);
      } else {
        value = undefined;
      }
      if (value) {
        setDateAndTime();
      }
    }
  });

  function formatTime(hours: number, minutes: number) {
    function pad(value: number) {
      return `${value < 10 ? "0" : ""}${value}`;
    }
    return pad(hours) + ":" + pad(minutes);
  }

  function clearTimeFromDate(date: DateTime): DateTime {
    return date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  }

  function setTimeRange(field: IField) {
    let from = DateTime.fromMillis(field.rangeFrom);
    let to = DateTime.fromMillis(field.rangeTo);
    timeRangeFrom = formatTime(from.hour, from.minute);
    timeRangeTo = formatTime(to.hour, to.minute);
    from = clearTimeFromDate(from);
    to = clearTimeFromDate(to);
    dateRangeFrom = from.toISODate();
    dateRangeTo = to.toISODate();
  }

  function setDateAndTime() {
    date = value!.toISODate();
    const hours = value!.hour;
    const minutes = value!.minute;
    time = formatTime(hours, minutes);
  }

  onMount(() => {
    debouncedOnChange = debounce((date: DateTime) => {
      field.value = date.toMillis();
      formStore.set(field, {
        fromUser: true,
        field: "value",
        value: field.value,
      });
      field.onChange?.(date);
    }, 300);

    if (field.value) {
      value = DateTime.fromMillis(field.value);
      setDateAndTime();
    } else {
      value = undefined;
    }
    if (field.rangeFrom || field.rangeTo) {
      setTimeRange(field);
    }
  });

  function setAtDateLimit() {
    if (!dateRangeTo) {
      atDateLimit = false;
      return;
    }
    if (!dateRangeFrom) {
      atDateBeforeLimit = false;
      return;
    }
    const current = DateTime.fromISO(date);
    current.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    if (dateRangeTo) {
      const toLimit = DateTime.fromISO(dateRangeTo);
      toLimit.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      const at = toLimit.toMillis() <= current.toMillis();
      atDateLimit = at;
    }

    if (dateRangeFrom) {
      const fromLimit = DateTime.fromISO(dateRangeFrom);
      fromLimit.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      const at = current.toMillis() <= fromLimit.toMillis();
      atDateBeforeLimit = at;
    }
  }

  function onDateChange() {
    if (debouncedOnChange) {
      if (!field.showDate) {
        date = DateTime.local().toISODate();
      }
      let d = DateTime.fromISO(date);
      if (time && time !== "NaN:NaN") {
        const split = time.split(":");
        const hour = split[0];
        const minute = split[1];
        d = d.set({
          hour: parseInt(hour, 10),
          minute: parseInt(minute, 10),
          millisecond: 0,
        });
      } else {
        d = d.set({ hour: 0, minute: 0, millisecond: 0 });
      }
      if (!field.showDate && !time) {
        d = d.set({ hour: 0, minute: 0, millisecond: 0 });
      }
      setAtDateLimit();
      debouncedOnChange(d);
    }
  }
</script>

<Label {field} />

<div class="grid grid-cols-6 gap-2">
  {#if field.showDate}
    <div class="col-span-6 sm:col-span-3">
      <input
        type="date"
        required
        on:click|stopPropagation
        value={date}
        min={dateRangeFrom}
        max={dateRangeTo}
        on:change={(e) => {
          date = e.target.value;
          onDateChange();
        }}
        class="form-input block w-full sm:text-sm sm:leading-5" />
    </div>
  {/if}
  {#if field.showTime}
    <div class="col-span-6 sm:col-span-3">
      <input
        type="time"
        required
        min={atDateBeforeLimit ? timeRangeFrom : ''}
        max={atDateLimit ? timeRangeTo : ''}
        on:click|stopPropagation
        data-date-inline-picker="true"
        value={time}
        on:change={(e) => {
          time = e.target.value;
          onDateChange();
        }}
        class="form-input block w-full sm:text-sm sm:leading-5" />
    </div>
  {/if}
</div>

{#if field.helperText}
  <p class="mt-2 text-sm text-gray-500">
    {@html field.helperText ?? ''}
  </p>
{/if}
