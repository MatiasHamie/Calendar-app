export enum Types {
  uiOpenModal = "[ui] Open Modal",
  uiCloseModal = "[ui] Close Modal",
}

export type ActionType =
  | { type: Types.uiOpenModal }
  | { type: Types.uiCloseModal };
