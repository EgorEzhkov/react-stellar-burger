import { createPortal } from "react-dom";
import style from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DELETE_INFO_INGREDIENT } from "../../services/actions/infoIngredientData";

const modalPortal = document.getElementById("react-modals");

export default function Modal({ children, handlePopupState }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const handlePopupClose = (evt) => {
      if (evt.key === "Escape") {
        handlePopupState(false);
        dispatch({ type: DELETE_INFO_INGREDIENT });
      }
    };

    document.addEventListener("keyup", handlePopupClose);
    return () => {
      document.removeEventListener("keyup", handlePopupClose);
    };
  }, [handlePopupState]);

  return createPortal(
    <>
      <div className={style.container}>
        <button
          onClick={() => {
            handlePopupState(false);
            dispatch({ type: DELETE_INFO_INGREDIENT });
          }}
          className={`${style.button} mt-15 mr-10`}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay handlePopupClose={handlePopupState} />
    </>,
    modalPortal
  );
}

Modal.propTypes = {
  handlePopupState: PropTypes.func.isRequired,
};
