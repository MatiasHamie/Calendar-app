import { ActionType, Types } from "../types/types";
import moment from "moment";
const initialState = {
  //eventos existentes en el calendario
  events: [
    {
      id: new Date().getTime(),
      title: "Cumpleaños del jefe",
      start: moment().toDate(), //sinonimo de un new Date() pero con moment
      end: moment().add(2, "hours").toDate(), //le agrego 2 horas a la hora actual
      notes: "Comprar el pastel",
      user: {
        _id: "123",
        name: "Matias",
      },
    },
  ],
  //potencial evento nuevo
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case Types.eventSetActive:
      return { ...state, activeEvent: action.payload };

    case Types.eventAddNew:
      // devolve una copia del state como esta, y de los events, devolveme los que ya tiene, y al final agregame el nuevo
      return { ...state, events: [...state.events, action.payload] };

    case Types.eventClearActiveEvent:
      return { ...state, activeEvent: null };

    //busco el evento que esta dentro del array q coincida con el nuevo, cuando lo encuentro lo modifico
    case Types.eventUpdated:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case Types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload.id),
        activeEvent: null,
      };

    default:
      return state;
  }
};
