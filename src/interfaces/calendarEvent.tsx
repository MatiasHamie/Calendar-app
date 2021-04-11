import { User } from "./user";
export interface ICalendarEvent {
  id?: Date | number;
  title: string;
  start: Date;
  end: Date;
  notes: string;
  user?: User;
}
