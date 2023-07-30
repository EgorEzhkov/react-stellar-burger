import styles from "./app.module.css";
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredientsData";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
            <header>
              <AppHeader />
            </header>
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
              <Modal handlePopupState={setOrderDetalsPopupOpen}>
                <OrderDetails />
              </Modal>
            )}
            {ingredientDetailsPopupOpen && (
              <Modal handlePopupState={setIngredientDetailsPopupOpen}>
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
