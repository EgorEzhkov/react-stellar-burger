import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

const modalPortal = document.getElementById("react-modals");
export default function Modal({ children, handlePopupClose }) {
  React.useEffect(() => {
    const closePopup = (evt) => {
      if (evt.key === "Escape") {
        handlePopupClose();
      }
    };

    document.addEventListener("keyup", closePopup);
    return () => {
      document.removeEventListener("keyup", closePopup);
    };
  }, [handlePopupClose]);

  return createPortal(
    <>
      <div className={styles.container}>
        <button
          onClick={() => {
            handlePopupClose();
          }}
          className={`${styles.button} mt-15 mr-10`}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay handlePopupClose={handlePopupClose} />
    </>,
    modalPortal
  );
}

Modal.propTypes = {
  handlePopupClose: PropTypes.func.isRequired,
};
