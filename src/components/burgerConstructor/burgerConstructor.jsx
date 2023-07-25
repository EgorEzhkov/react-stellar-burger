import {
  CurrencyIcon,
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiOrder } from "../../services/actions/orderDetailsData";
function BurgerConstructor({ handlePopupState }) {
  const dispatch = useDispatch();
  const dataIngredient = useSelector(
    (store) => store.dataConstructor.ingredients
  );
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const totalPrice = dataIngredient.reduce(function (accumulator, item) {
    if (item.type === "bun") {
      return item.price * 2 + accumulator;
    } else {
      return item.price + accumulator;
    }
  }, 0);
  let chosenBun = dataIngredient.find((item) => item.type === "bun");

  function apiOrderData(handlePopupState, dataIngredient) {
    handlePopupState(true);
    dispatch(getApiOrder(dataIngredient));
  }

  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (dataIngredient.length > 0) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [dataIngredient]);

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
          {dataIngredient.length > 0 ? (
            dataIngredient.map((el, index) => {
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
          onClick={() => apiOrderData(handlePopupState, dataIngredient)}
          htmlType="button"
          type="primary"
          size="large"
          disabled={buttonState}
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
};

export default BurgerConstructor;
