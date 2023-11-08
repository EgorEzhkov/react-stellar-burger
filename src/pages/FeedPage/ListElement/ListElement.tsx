import styles from "./ListElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../../utils/hooks";
import { FC, useMemo } from "react";
import { TOrder } from "../../../types/types";
const ListElement: FC<{ props: TOrder }> = ({ props }) => {
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);

  const elements = props.ingredients.map((ingredient, index) => {
    return ingredientsData.find((el) => {
      return el._id === ingredient;
    });
  });

  const filterElements = elements.filter((e) => e != undefined);

  const price = filterElements.reduce((accumulator, item) => {
    return item!.price + accumulator;
  }, 0);

  return (
    <div className={styles.listElement}>
      <div className={`mb-6 ${styles.numberAndTime}`}>
        <p className="text text_type_digits-default">#{props.number}</p>
        <p className="text text_type_main-default text_color_inactive">{props.createdAt}</p>
      </div>
      <p className={`text text_type_main-medium mb-6 ${styles.name}`}>{props.name}</p>
      <div className={styles.imgAndPrice}>
        {filterElements &&
          filterElements.map((idIngredient, number) => {
            return (
              number < 6 && (
                <div className={styles.imageContainer} data-count={`+${filterElements.slice(5).length}`} key={number}>
                  <img src={idIngredient!.image} alt="Ингредиент" className={styles.image} />
                </div>
              )
            );
          })}
        <div className={styles.price}>
          <p className="mr-2 text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default ListElement;
