import styles from "./ListElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useState } from "react";
const ListElement = ({ props }) => {
  const images = useSelector((store) => store.ingredients.ingredients);
  return (
    <div className={styles.listElement}>
      <div className={`mb-6 ${styles.numberAndTime}`}>
        <p className="text text_type_digits-default">{props.orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive">{props.time}</p>
      </div>
      <p className="text text_type_main-medium mb-6">{props.name}</p>
      <div className={styles.imgAndPrice}>
        {images &&
          images.map((el, number) => {
            return (
              number < 6 && (
                <div
                  className={styles.imageContainer}
                  data-count={`+${images.slice(5).length}`}
                  key={number}
                >
                  <img src={el.image} alt="Ингредиент" className={styles.image} />
                </div>
              )
            );
          })}
        <div className={styles.price}>
          <p className="mr-2 text text_type_digits-default">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default ListElement;
