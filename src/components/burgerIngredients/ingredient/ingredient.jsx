import styles from "./ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getInfoIngredient } from "../../../services/actions/infoIngredientData";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const Ingredient = ({ el, setPopupOpen }) => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredients.ingredients);
  const dataConstructor = useSelector(
    (store) => store.dataConstructor.ingredients
  );
  const dataBun = useSelector((store) => store.dataConstructor.bun);

  const findIngredient = (evt) => {
    const element = evt.currentTarget.id;
    const dataElement = data.find((data) => data._id === element);
    dispatch(getInfoIngredient(dataElement));
    setPopupOpen(true);
  };

  const count = useMemo(() => {
    const ingredients = [...dataConstructor, ...dataBun];
    return ingredients.filter((item) => item._id === el._id).length;
  }, [dataConstructor, dataBun]);

  const [, ref] = useDrag({
    type: "ingredient",
    item: el,
  });

  return (
    <li
      ref={ref}
      className={`${styles.listIngredients} ml-4 mr-6 mb-10 mt-0`}
      key={el._id}
      id={el._id}
      onClick={findIngredient}
    >
      {!count ? null : (
        <Counter count={count} size="default" extraClass="m-1" />
      )}

      <img src={el.image} alt={el.name} className="ml-0 mr-0 mb-1 mt-0" />
      <p className={`text text_type_digits-default mb-1 ${styles.price}`}>
        {el.price}
        <CurrencyIcon type="primary" />
      </p>
      <p id={el._id} className={`text text_type_main-default ${styles.name}`}>
        {el.name}
      </p>
    </li>
  );
};

Ingredient.propTypes = {
  setPopupOpen: PropTypes.func.isRequired,
  el: PropTypes.object.isRequired,
};
