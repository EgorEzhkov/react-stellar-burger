import React, { useEffect } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { postIngredient } from "../../services/actions/constructorIngredientsData";
import { getInfoIngredient } from "../../services/actions/infoIngredientData";
import { useInView } from "react-intersection-observer";
function BurgerIngredients({ setPopupOpen }) {
  const data = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();

  const [current, setCurrent] = React.useState("Булки");
  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const findIngredient = (evt) => {
    const element = evt.currentTarget.id;
    const dataElement = data.find((data) => data._id === element);
    dispatch(getInfoIngredient(dataElement));
    setPopupOpen(true);
  };

  const addIngredientToConstructor = (evt) => {
    const element = evt.currentTarget.id;
    const dataElement = data.find((data) => data._id === element);
    if (dataElement.type === "bun") {
      dataElement.__v = +2;
    } else {
      dataElement.__v = dataElement.__v + 1;
    }
    dispatch(postIngredient(dataElement));
  };

  const [bunsRef, bunsInView] = useInView({ threshold: 0.3 });
  const [sausesRef, sausesInView] = useInView({ threshold: 0.3 });
  const [mainRef, mainInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (bunsInView) {
      setCurrent("Булки");
    } else if (sausesInView) {
      setCurrent("Соусы");
    } else if (mainInView) {
      setCurrent("Начинки");
    }
  }, [bunsInView, sausesInView, mainInView]);

  function list(el) {
    return (
      <React.Fragment key={el._id}>
        <li className={`${styles.listIngredients} ml-4 mr-6 mb-10 mt-0`}>
          <Counter count={el.__v} size="default" extraClass="m-1" />
          <img
            id={el._id}
            onClick={findIngredient}
            src={el.image}
            alt={el.name}
            className="ml-0 mr-0 mb-1 mt-0"
          />
          <p className={`text text_type_digits-default mb-1 ${styles.price}`}>
            {el.price}
            <CurrencyIcon type="primary" />
          </p>
          <p
            id={el._id}
            onClick={addIngredientToConstructor}
            className={`text text_type_main-default ${styles.name}`}
          >
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
        <div ref={bunsRef} className={styles.typeIngredients}>
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
        <div ref={sausesRef} className={styles.typeIngredients}>
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
        <div ref={mainRef} className={styles.typeIngredients}>
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
  setPopupOpen: PropTypes.func.isRequired,
};

export default BurgerIngredients;
