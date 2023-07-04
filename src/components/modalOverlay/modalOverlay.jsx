import style from "./modalOverlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ handlePopupClose }) {
  return (
    <div
      onClick={() => {
        handlePopupClose(false);
      }}
      className={style.overlay}
    ></div>
  );
}

ModalOverlay.propTypes = {
  handlePopupClose: PropTypes.func.isRequired,
};
