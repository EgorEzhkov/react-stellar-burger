import React from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { IngredientsContext } from "../../services/ingredientsContext";
import {useContext} from 'react'
import ConstructorContext from "../../services/constructorContext";
function BurgerIngredients({ data, setDataIngredient, setPopupOpen, setConstructorContext }) {
  const constructorContext = useContext(ConstructorContext)
  const [current, setCurrent] = React.useState("Булки");
  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };


  const findIngredient = (evt) => {
    const element = evt.currentTarget.id;
    const dataElement = data.find((data) => data._id === element);
    setConstructorContext([...constructorContext, dataElement]);
    if (dataElement.type === 'bun') {
      dataElement.__v =+ 2
    } else {
      dataElement.__v = dataElement.__v + 1
    }
    
    // setPopupOpen(true);
  };

  function list(el) {
    return (
      <React.Fragment key={el._id}>
        <li
          onClick={findIngredient}
          id={el._id}
          className={`${styles.listIngredients} ml-4 mr-6 mb-10 mt-0`}
        >
          <Counter count={el.__v} size="default" extraClass="m-1" />
          <img src={el.image} alt={el.name} className="ml-0 mr-0 mb-1 mt-0" />
          <p className={`text text_type_digits-default mb-1 ${styles.price}`}>
            {el.price}
            <CurrencyIcon type="primary" />
          </p>
          <p className={`text text_type_main-default ${styles.name}`}>
            {el.name}
          </p>
        </li>
      </React.Fragment>
    );
  }

  return (
    <>
      <div>
        <h1 className="text text_type_main-large ml-0 mr-0 mb-5 mt-10">
          Соберите бургер
        </h1>
        <div style={{ display: "flex" }} className="mb-10">
          <Tab value="Булки" active={current === "Булки"} onClick={setTab}>
            Булки
          </Tab>
          <Tab value="Соусы" active={current === "Соусы"} onClick={setTab}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={current === "Начинки"} onClick={setTab}>
            Начинки
          </Tab>
        </div>
      </div>
      <div className={`custom-scroll ${styles.scroll}`}>
        <h2 id="Булки" style={{ marginTop: 0 }} className="mb-6">
          Булки
        </h2>
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
        <h2 id="Соусы" style={{ marginTop: 0 }} className="mb-6">
          Соусы
        </h2>
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
        <h2 id="Начинки" style={{ marginTop: 0 }} className="mb-6">
          Начинки
        </h2>
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

BurgerIngredients.propTypes = {
  setDataIngredient: PropTypes.func.isRequired,
  setPopupOpen: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(ingredientPropType),
};

export default BurgerIngredients;
