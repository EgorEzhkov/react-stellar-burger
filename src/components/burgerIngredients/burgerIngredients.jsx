import React from "react";
import { data } from "../../utils/data";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("Соусы");
  return (
    <>
      <div>
        <h1 className="text text_type_main-large ml-0 mr-0 mb-5 mt-10">
          Соберите бургер
        </h1>
        <div style={{ display: "flex" }} className="mb-10">
          <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </div>
      </div>
      <div className={`custom-scroll ${styles.scroll}`}>
        <h2>Булки</h2>
        <div className={styles.typeIngredients}>
          {data.map((el, index) => {
            if (el.type === "bun")
              return (
                <ul style={{ padding: 0, margin: 0 }} key={index}>
                  {list(el)}
                </ul>
              );
          })}
        </div>
        <h2>Соусы</h2>
        <div className={styles.typeIngredients}>
          {data.map((el, index) => {
            if (el.type === "sauce")
              return (
                <ul style={{ padding: 0, margin: 0 }} key={index}>
                  {list(el)}
                </ul>
              );
          })}
        </div>
        <h2>Начинки</h2>
        <div className={styles.typeIngredients}>
          {data.map((el, index) => {
            if (el.type === "main")
              return (
                <ul style={{ padding: 0, margin: 0 }} key={index}>
                  {list(el)}
                </ul>
              );
          })}
        </div>
      </div>
    </>
  );
}

function list(el) {
  return (
    <React.Fragment key={el._id}>
      <li className={`${styles.listIngredients} ml-4 mr-6 mb-10 mt-0`}>
        <img src={el.image} alt={el.name} className="ml-0 mr-0 mb-1 mt-0" />
        <p className={`text text_type_digits-default mb-1 ${styles.price}`}>
          {el.price}
          <CurrencyIcon type="primary"/>
        </p>
        <p className={`text text_type_main-small ${styles.name}`}>{el.name}</p>
      </li>
    </React.Fragment>
  );
}

export default BurgerIngredients;
