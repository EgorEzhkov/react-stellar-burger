import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredientsData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DELETE_INFO_INGREDIENT } from "../../services/actions/infoIngredientData";

function App() {
  const [orderDetalsPopupOpen, setOrderDetalsPopupOpen] = useState(false);
  const [ingredientDetailsPopupOpen, setIngredientDetailsPopupOpen] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const ingredientsRequest = useSelector(
    (store) => store.ingredients.ingredientsRequest
  );

  const closeIngredientsPopup = () => {
    setIngredientDetailsPopupOpen(false);
    dispatch({ type: DELETE_INFO_INGREDIENT });
  };

  const closeOrderPopup = () => {
    setOrderDetalsPopupOpen(false);
  };

  return (
    <div className={styles.app}>
      <pre
        style={{
          margin: "0",
          fontSize: "1.5rem",
        }}
      >
        {ingredientsRequest ? (
          <h1>Идет загрузка данных</h1>
        ) : (
          <>
            <AppHeader />
            <main className={styles.main}>
              <DndProvider backend={HTML5Backend}>
                <div className={styles.div}>
                  <BurgerIngredients
                    setPopupOpen={setIngredientDetailsPopupOpen}
                  />
                </div>
                <div>
                  <BurgerConstructor
                    handlePopupState={setOrderDetalsPopupOpen}
                  />
                </div>
              </DndProvider>
            </main>
            {orderDetalsPopupOpen && (
              <Modal handlePopupClose={closeOrderPopup}>
                <OrderDetails />
              </Modal>
            )}
            {ingredientDetailsPopupOpen && (
              <Modal handlePopupClose={closeIngredientsPopup}>
                <IngredientDetails />
              </Modal>
            )}
          </>
        )}
      </pre>
    </div>
  );
}

export default App;
