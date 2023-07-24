import styles from "./app.module.css";
import AppHeader from "../app-header/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import {apiIngredients} from "../../utils/api";
import { useEffect, useState } from "react";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import IngredientsContext from "../../services/ingredientsContext";
import ConstructorContext from "../../services/constructorContext";
import OrderContext from "../../services/orderContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataIngredient, setDataIngredient] = useState([]);
  const [orderDetalsPopupOpen, setOrderDetalsPopupOpen] = useState(false);
  const [ingredientDetailsPopupOpen, setIngredientDetailsPopupOpen] =
    useState(false);
  const [constructorContext, setConstructorContext] = useState([]);
  const [orderContext, setOrderContext] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    apiIngredients()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.app}>
      <pre
        style={{
          margin: "0",
          fontSize: "1.5rem",
        }}
      >
        {isLoading ? (
          <h1>Идет загрузка данных</h1>
        ) : (
          <>
            <IngredientsContext.Provider value={data}>
              <ConstructorContext.Provider value={constructorContext}>
                <OrderContext.Provider value={orderContext}>
                  <header>
                    <AppHeader />
                  </header>
                  <main className={styles.main}>
                    <div className={styles.div}>
                      <BurgerIngredients
                        data={data}
                        setDataIngredient={setDataIngredient}
                        setPopupOpen={setIngredientDetailsPopupOpen}
                        setConstructorContext={setConstructorContext}
                      />
                    </div>
                    <div>
                      <BurgerConstructor
                        data={data}
                        handlePopupState={setOrderDetalsPopupOpen}
                        setOrderContext={setOrderContext}
                      />
                    </div>
                  </main>
                  {orderDetalsPopupOpen && (
                    <Modal handlePopupState={setOrderDetalsPopupOpen}>
                      {orderContext && <OrderDetails/>} 
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
            </IngredientsContext.Provider>
          </>
        )}
      </pre>
    </div>
  );
}

export default App;
