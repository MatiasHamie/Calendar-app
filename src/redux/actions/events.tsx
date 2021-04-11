import { Types } from "../types/types";
import { ICalendarEvent } from "../../interfaces/calendarEvent";

export const eventAddNew = (e: ICalendarEvent) => ({
  type: Types.eventAddNew,
  payload: e,
});

export const eventSetActive = (e: ICalendarEvent) => ({
  type: Types.eventSetActive,
  payload: e,
});

export const eventClearActiveEvent = () => ({
  type: Types.eventClearActiveEvent,
});

export const eventUpdated = (e: ICalendarEvent) => ({
  type: Types.eventUpdated,
  payload: e,
});

export const eventDeleted = (e: ICalendarEvent) => ({
  type: Types.eventDeleted,
  payload: e,
});
