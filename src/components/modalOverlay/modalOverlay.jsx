import style from "./modalOverlay.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DELETE_INFO_INGREDIENT } from "../../services/actions/infoIngredientData";

export default function ModalOverlay({ handlePopupClose }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        handlePopupClose(false);
        dispatch({ type: DELETE_INFO_INGREDIENT });
      }}
      className={style.overlay}
    ></div>
  );
}

ModalOverlay.propTypes = {
  handlePopupClose: PropTypes.func.isRequired,
};
