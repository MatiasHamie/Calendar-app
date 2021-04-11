import { Types, ActionType } from "../types/types";

const initialState = {
  modalOpen: false,
};

export const uiReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case Types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };

    case Types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};
