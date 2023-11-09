import { FunctionComponent } from "react";
import styles from "./ModalOverlay.module.css";

interface IProps {
  handlePopupClose: Function;
}

const ModalOverlay: FunctionComponent<IProps> = ({ handlePopupClose }) => {
  return (
    <div
      onClick={() => {
        handlePopupClose();
      }}
      className={styles.overlay}
    ></div>
  );
};

export default ModalOverlay;
