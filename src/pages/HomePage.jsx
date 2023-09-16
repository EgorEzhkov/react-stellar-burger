import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import styles from "./HomePage.module.css";
import { useDispatch } from "react-redux";
import { DELETE_INFO_INGREDIENT } from "../services/actions/infoIngredientData";

const HomePage = () => {
  const dispatch = useDispatch();
  const [ingredientDetailsPopupOpen, setIngredientDetailsPopupOpen] = useState(false);
  const [orderDetalsPopupOpen, setOrderDetalsPopupOpen] = useState(false);
  const closeOrderPopup = () => {
    setOrderDetalsPopupOpen(false);
  };



  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.div}>
          <BurgerIngredients setPopupOpen={setIngredientDetailsPopupOpen} />
        </div>
        <div>
          <BurgerConstructor handlePopupState={setOrderDetalsPopupOpen} />
        </div>
      </DndProvider>
      {orderDetalsPopupOpen && (
        <Modal handlePopupClose={closeOrderPopup}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
