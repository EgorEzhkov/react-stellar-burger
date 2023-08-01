import React, { useEffect } from "react";
import {
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useDrag } from "react-dnd";
import { Ingredient } from "./Ingredient/Ingredient";
function BurgerIngredients({ setPopupOpen }) {
  const data = useSelector((store) => store.ingredients.ingredients);
  const [current, setCurrent] = React.useState("Булки");
  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
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

  const [, ref] = useDrag({
    type: "ingredient",
    item: { data },
  });

  function list(el) {}

  return (
    <>
      <div>
        <h1 className="text text_type_main-large ml-0 mr-0 mb-5 mt-10">
          Соберите бургер
        </h1>
        <div className={`mb-10 ${styles.tabContainer}`}>
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
        <h2 id="Булки" className={`mb-6 ${styles.typeIngredients}`}>
          Булки
        </h2>
        <div ref={bunsRef} className={styles.typeIngredients}>
          {data.map((el) => {
            if (el.type === "bun")
              return (
                <ul className={styles.ingredientList} key={el._id}>
                  <Ingredient el={el} setPopupOpen={setPopupOpen}></Ingredient>
                </ul>
              );
          })}
        </div>
        <h2 id="Соусы" className={`mb-6 ${styles.typeIngredients}`}>
          Соусы
        </h2>
        <div ref={sausesRef} className={styles.typeIngredients}>
          {data.map((el) => {
            if (el.type === "sauce")
              return (
                <ul className={styles.ingredientList} key={el._id}>
                  <Ingredient el={el} setPopupOpen={setPopupOpen}></Ingredient>
                </ul>
              );
          })}
        </div>
        <h2 id="Начинки" className={`mb-6 ${styles.typeIngredients}`}>
          Начинки
        </h2>
        <div ref={mainRef} className={styles.typeIngredients}>
          {data.map((el) => {
            if (el.type === "main")
              return (
                <ul className={styles.ingredientList} key={el._id}>
                  <Ingredient el={el} setPopupOpen={setPopupOpen}></Ingredient>
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
