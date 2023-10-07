import styles from "./ListElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
const ListElement = ({ props }) => {
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const elements = props.ingredients.map((ingredient) => {
    return ingredientsData.find((el) => {
      return ingredient === el._id;
    });
  });

  console.log(elements);

  const price = elements.reduce((accumulator, item) => {
    return item.price + accumulator;
  }, 0);

  return (
    <div className={styles.listElement}>
      <div className={`mb-6 ${styles.numberAndTime}`}>
        <p className="text text_type_digits-default">#{props.number}</p>
        <p className="text text_type_main-default text_color_inactive">{props.createdAt}</p>
      </div>
      <p className={`text text_type_main-medium mb-6 ${styles.name}`}>{props.name}</p>
      <div className={styles.imgAndPrice}>
        {ingredientsData &&
          props.ingredients.map((idIngredient, number) => {
            const element = ingredientsData.find((el) => {
              return el._id === idIngredient;
            });
            return (
              number < 6 && (
                <div
                  className={styles.imageContainer}
                  data-count={`+${props.ingredients.slice(5).length}`}
                  key={number}
                >
                  <img src={element.image} alt="Ингредиент" className={styles.image} />
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
