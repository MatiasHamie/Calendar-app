import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventDeleted } from "../../redux/actions/events";
import { RootState } from "../../interfaces/useSelectorRootState";
import { ICalendarEvent } from "../../interfaces/calendarEvent";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const activeEvent: ICalendarEvent = useSelector<RootState, ICalendarEvent>(
    (state: RootState) => state.calendar.activeEvent
  );

  const handleDelete = () => {
    console.log(activeEvent);
    dispatch(eventDeleted(activeEvent));
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}>
      <i className="fas fa-trash"></i>
      <span> Borrar Evento </span>
    </button>
  );
};
