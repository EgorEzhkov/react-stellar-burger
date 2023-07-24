import styles from "./app.module.css";
import AppHeader from "../app-header/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import { useEffect, useState } from "react";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import ConstructorContext from "../../services/constructorContext";
import OrderContext from "../../services/orderContext";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredientsData";

function App() {
  const [dataIngredient, setDataIngredient] = useState([]);
  const [orderDetalsPopupOpen, setOrderDetalsPopupOpen] = useState(false);
  const [ingredientDetailsPopupOpen, setIngredientDetailsPopupOpen] =
    useState(false);
  const [constructorContext, setConstructorContext] = useState([]);
  const [orderContext, setOrderContext] = useState([]);
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
            <ConstructorContext.Provider value={constructorContext}>
              <OrderContext.Provider value={orderContext}>
                <header>
                  <AppHeader />
                </header>
                <main className={styles.main}>
                  <div className={styles.div}>
                    <BurgerIngredients
                      setDataIngredient={setDataIngredient}
                      setPopupOpen={setIngredientDetailsPopupOpen}
                      setConstructorContext={setConstructorContext}
                    />
                  </div>
                  <div>
                    <BurgerConstructor
                      handlePopupState={setOrderDetalsPopupOpen}
                      setOrderContext={setOrderContext}
                    />
                  </div>
                </main>
                {orderDetalsPopupOpen && (
                  <Modal handlePopupState={setOrderDetalsPopupOpen}>
                    {orderContext && <OrderDetails />}
                  </Modal>
                )}
                {ingredientDetailsPopupOpen && (
                  <Modal handlePopupState={setIngredientDetailsPopupOpen}>
                    <IngredientDetails
                      data={dataIngredient}
                    ></IngredientDetails>
                  </Modal>
                )}
              </OrderContext.Provider>
            </ConstructorContext.Provider>
          </>
        )}
      </pre>
    </div>
  );
}

export default App;
