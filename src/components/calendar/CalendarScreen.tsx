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
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../redux/actions/ui";
import { CalendarModal } from "./CalendarModal";
moment.locale("es");

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Cumpleaños del jefe",
    start: moment().toDate(), //sinonimo de un new Date() pero con moment
    end: moment().add(2, "hours").toDate(), //le agrego 2 horas a la hora actual
    notes: "Comprar el pastel",
    user: {
      _id: "123",
      name: "Matias",
    },
  },
];

export const CalendarScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState<View | string>(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e: any) => {
    console.log("abrir modal");
    // NO OLVIDAR QUE ACA NO VA UN PUNTERO A FUNCION, SE INVOCA
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e: any) => {
    console.log(e);
  };

  // Cuando cambiamos de pagina (mes, dia, etc.) se mantiene el evento seleccionado
  const onViewChange = (e: any) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
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
        onView={onViewChange}
        view={lastView as View}
        components={{
          event: CalendarEvent,
        }}
      />

      <CalendarModal />
    </div>
  );
};
