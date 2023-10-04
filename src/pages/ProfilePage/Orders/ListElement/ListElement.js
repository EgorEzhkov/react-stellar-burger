import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import styles from "./ListElement.module.css";

const ListElement = ({ props }) => {
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);

  const elements = props.ingredients.map((ingredient) => {
    return ingredientsData.find((el) => {
      return el._id === ingredient;
    });
  });

  const price = elements.reduce((accumulator, item) => {
    return item.price + accumulator;
  }, 0);

  const { createdAt, name, number, status } = props;

  return (
    <div className={`ml-15 ${styles.listElement}`}>
      <div className={`mb-6 ${styles.numberAndTime}`}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">{createdAt}</p>
      </div>
      <p className="text text_type_main-medium mb-2">{name}</p>
      {status === "done" && (
        <p className={`mb-6 text text_type_main-default ${styles.textActive}`}>Выполнен</p>
      )}
      {status === "created" && <p className="mb-6 text text_type_main-default">Создан</p>}
      {status === "pending" && <p className="mb-6 text text_type_main-default">Готовится</p>}
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
