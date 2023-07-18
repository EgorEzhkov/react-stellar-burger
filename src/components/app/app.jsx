import styles from "./app.module.css";
import React from "react";
import AppHeader from "../app-header/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import Modal from "../modal/modal";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import OrderDetails from "../orderDetails/orderDetails";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import IngredientsContext from "../../services/ingredientsContext";
import ConstructorContext from "../../services/constructorContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataIngredient, setDataIngredient] = useState([]);
  const [orderDetalsPopupOpen, setOrderDetalsPopupOpen] = useState(false);
  const [ingredientDetailsPopupOpen, setIngredientDetailsPopupOpen] =
    useState(false);
  const [constructorContext, setConstructorContext] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api()
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
                    />
                  </div>
                </main>
                {orderDetalsPopupOpen && (
                  <Modal handlePopupState={setOrderDetalsPopupOpen}>
                    <OrderDetails orderData={321342}></OrderDetails>
                  </Modal>
                )}
                {ingredientDetailsPopupOpen && (
                  <Modal handlePopupState={setIngredientDetailsPopupOpen}>
                    <IngredientDetails
                      data={dataIngredient}
                    ></IngredientDetails>
                  </Modal>
                )}
              </ConstructorContext.Provider>
            </IngredientsContext.Provider>
          </>
        )}
      </pre>
    </div>
  );
}

export default App;
