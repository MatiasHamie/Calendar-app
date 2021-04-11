import { ICalendarEvent } from "../../interfaces/calendarEvent";
export enum Types {
  uiOpenModal = "[ui] Open Modal",
  uiCloseModal = "[ui] Close Modal",

  eventAddNew = "[event] Add New",
  eventSetActive = "[event] Set Active",
  eventClearActiveEvent = "[event] Clear active event",
  eventUpdated = "[event] Event updated",
  eventDeleted = "[event] Event deleted",
}

export type ActionType =
  | { type: Types.uiOpenModal }
  | { type: Types.uiCloseModal }
  | { type: Types.eventAddNew; payload: ICalendarEvent }
  | { type: Types.eventSetActive; payload: ICalendarEvent }
  | { type: Types.eventClearActiveEvent }
  | { type: Types.eventUpdated; payload: ICalendarEvent }
  | { type: Types.eventDeleted; payload: ICalendarEvent };
