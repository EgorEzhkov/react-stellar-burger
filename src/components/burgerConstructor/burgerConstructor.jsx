import {
  CurrencyIcon,
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useContext } from "react";
import ConstructorContext from "../../services/constructorContext";
import { apiOrder } from "../../utils/api";
function BurgerConstructor({ handlePopupState, setOrderContext }) {
  const constructorContext = useContext(ConstructorContext);
  const totalPrice = constructorContext.reduce(function (accumulator, item) {
    if (item.type === "bun") {
      return item.price * 2 + accumulator;
    } else {
      return item.price + accumulator;
    }
  }, 0);
  let chosenBun = constructorContext.find((item) => item.type === "bun");

  function apiOrderData(handlePopupState, constructorContext) {
    handlePopupState(true);
    apiOrder(constructorContext)
      .then((data) => setOrderContext(data.order.number))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  return (
    <>
      <div
        className={`mt-25 mb-10 ml-10 ${styles.container}`}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div style={{ display: "flex", whiteSpace: "pre-wrap" }}>
          {chosenBun ? (
            <ConstructorElement
              type="top"
              text={`${chosenBun.name} (верх)`}
              price={chosenBun.price}
              thumbnail={chosenBun.image}
              isLocked={true}
            />
          ) : (
            <p>Выбери булку</p>
          )}
        </div>

        <ul
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          className={`custom-scroll ${styles.listConsctructor}`}
        >
          {constructorContext.length > 0 ? (
            constructorContext.map((el, index) => {
              return ConstructorList(el, index);
            })
          ) : (
            <p>Выбери ингредиенты</p>
          )}
        </ul>

        {chosenBun ? (
          <div style={{ display: "flex", whiteSpace: "pre-wrap" }}>
            <ConstructorElement
              type="bottom"
              text={`${chosenBun.name} (низ)`}
              price={chosenBun.price}
              thumbnail={chosenBun.image}
              isLocked={true}
            />
          </div>
        ) : (
          <p>Выбери булку</p>
        )}
      </div>
      <div className={styles.finalPrice}>
        <p className="text text_type_digits-medium mr-10">
          {totalPrice}
          <CurrencyIcon />
        </p>
        <Button
          onClick={() => apiOrderData(handlePopupState, constructorContext)}
          htmlType="button"
          type="primary"
          size="large"
        >
          Нажми на меня
        </Button>
      </div>
    </>
  );
}

function ConstructorList(el, index) {
  if (el.type !== "bun") {
    return (
      <li key={index} className={`${styles.li}`}>
        <div className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={el.name}
            price={el.price}
            thumbnail={el.image}
          />
        </div>
      </li>
    );
  }
}

BurgerConstructor.propTypes = {
  handlePopupState: PropTypes.func.isRequired,
  setOrderContext: PropTypes.func.isRequired,
};

export default BurgerConstructor;
