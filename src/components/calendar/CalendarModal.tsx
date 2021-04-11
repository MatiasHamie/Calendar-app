import React, { ChangeEvent, useState } from "react";

import Swal from "sweetalert2";

import Modal from "react-modal";

// los types no se encuentran mas en npm, por ende uso el ignore
// @ts-ignore
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../interfaces/useSelectorRootState";
import { uiCloseModal } from "../../redux/actions/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// La documentacion dice que hay que agregar esto
// Modal.setAppElement('#yourAppElement');
// el app element q te pide es el root, el primer div de la app en el index.html
Modal.setAppElement("#root");

// seteo la fecha de inicio en minutos 0, segundos 0 y agrego 1 hora desde la hora actual
const now = moment().minutes(0).seconds(0).add(1, "hours");
const then = now.clone().add(1, "hours");

export const CalendarModal: React.FC = () => {
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(then.toDate());
  const [isTitleValid, setisTitleValid] = useState(true);

  const dispatch = useDispatch();

  // useSelector<tipo de dato del state que es el de redux dev tools, tipo dato retorno>
  const modalIsOpen: boolean = useSelector<RootState, boolean>(
    (state: RootState) => state.ui.modalOpen
  );

  const closeModal = () => {
    // Pendiente: Cerrar el modal
    console.log("cerrar modal");
    dispatch(uiCloseModal());
  };

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: now.toDate(),
    end: then.toDate(),
  });

  const { title, notes, start, end } = formValues;

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleStartDateChange = (e: any) => {
    setDateStart(e);

    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e: any) => {
    setDateEnd(e);

    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe de ser mayor a la fecha de inicio",
        "error"
      );
    }

    // trim para quitar los espacios
    // para mostrar warning, uso bootstrap
    if (title.trim().length < 2) {
      return setisTitleValid(false);
    }

    //Pendiente: realizar grabacion a la base de datos
    setisTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen as boolean}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />

      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            className="form-control"
            onChange={handleStartDateChange}
            value={dateStart}
            format="y-MM-dd h:mm:ss a"
            amPmAriaLabel="Select AM/PM"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            className="form-control"
            onChange={handleEndDateChange}
            value={dateEnd}
            format="y-MM-dd h:mm:ss a"
            amPmAriaLabel="Select AM/PM"
            minDate={dateStart} //valido que la fecha minima sea la fecha de inicio
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            // is-invalid es de bootstrap, te marca directamente en el input un error
            className={`form-control ${!isTitleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
