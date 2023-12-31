import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ handlePopupClose }) {
  return (
    <div
      onClick={() => {
        handlePopupClose();
      }}
      className={styles.overlay}
    ></div>
  );
}

ModalOverlay.propTypes = {
  handlePopupClose: PropTypes.func.isRequired,
};
