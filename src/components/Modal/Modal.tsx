import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, ReactElement } from "react";
const modalPortal = document.getElementById("react-modals") as HTMLDivElement;

interface IProps {
  childred: ReactElement;
  handlePopupClose: Function;
}

const Modal: FC<IProps> = ({ children, handlePopupClose }) => {
  React.useEffect(() => {
    const closePopup = (evt: KeyboardEvent) => {
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

export default Modal

