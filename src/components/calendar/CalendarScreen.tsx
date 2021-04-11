import React, { useState } from "react";
import { NavBar } from "../ui/NavBar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Calendar,
  EventPropGetter,
  momentLocalizer,
  View,
} from "react-big-calendar";
import { messages } from "../../helpers/calendar-messages-es";
import moment from "moment";

// Cambio a español los dias de la semana
// el resto se cambia agregando los calendar-messages y pasandoselos a las props del calendar
import "moment/locale/es";
import { CalendarEvent } from "./CalendarEvent";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../redux/actions/ui";
import { CalendarModal } from "./CalendarModal";
import {
  eventClearActiveEvent,
  eventSetActive,
} from "../../redux/actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { RootState } from "../../interfaces/useSelectorRootState";
import { ICalendarEvent } from "../../interfaces/calendarEvent";
import { DeleteEventFab } from "../ui/DeleteEventFab";
moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen: React.FC = () => {
  const dispatch = useDispatch();

  const events: ICalendarEvent[] = useSelector<RootState, ICalendarEvent[]>(
    (state: RootState) => state.calendar.events
  );

  // useSelector<tipo de dato del state que es el de redux dev tools, tipo dato retorno>

  const activeEvent: ICalendarEvent = useSelector<RootState, ICalendarEvent>(
    (state: RootState) => state.calendar.activeEvent
  );

  const [lastView, setLastView] = useState<View | string>(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e: any) => {
    // NO OLVIDAR QUE ACA NO VA UN PUNTERO A FUNCION, SE INVOCA
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e: any) => {
    dispatch(eventSetActive(e));
  };

  // Cuando cambiamos de pagina (mes, dia, etc.) se mantiene el evento seleccionado
  const onViewChange = (e: any) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  // cuando se clickea en otro lugar del calendario q no sea un evento ya guardado, borra el active event
  const onSelectSlot = (e: any) => {
    dispatch(eventClearActiveEvent());
  };

  // esta funcion le aplica estilo a cada evento en particular
  // el tipado tiene q mejorarse, pero asi debe ser como plantilla
  const eventStyleGetter: EventPropGetter<any> = (
    event: any,
    start: Date | string,
    end: Date | string,
    isSelected: boolean
  ) => {
    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "#fff",
    };

    return { style };
  };

  return (
    <div className="calendar-screen">
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true} //este tiene q ir de la mano con onSelectSlot
        onView={onViewChange}
        view={lastView as View}
        components={{
          event: CalendarEvent,
        }}
      />

      {activeEvent && <DeleteEventFab />}
      <AddNewFab />

      <CalendarModal />
    </div>
  );
};
