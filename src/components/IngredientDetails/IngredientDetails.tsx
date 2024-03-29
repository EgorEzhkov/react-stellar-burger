import styles from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "../../utils/hooks";

export default function IngredientDetails() {
  const { id } = useParams();
  const data = useSelector((store) => store.ingredients.ingredients);
  const ingredient = data.find((item) => item._id === id);

  return (
    <>
      {data && ingredient && (
        <div className={styles.container}>
          <header className={`ml-10 text text_type_main-large ${styles.header}`}>Детали ингредиента</header>
          <img width="480" height="240" src={ingredient.image} alt={ingredient.name} className={`mb-4 ${styles.image}`} />
          <p className={`mb-8 text text_type_main-medium ${styles.name}`}>{ingredient.name}</p>
          <ul className={`${styles.list} mb-15`}>
            <li className={`mr-5 text_color_inactive ${styles.listPoint}`}>
              <p className="text text_type_main-default">Калории,ккал</p>
              <span className="text text_type_digits-default">{ingredient.calories}</span>
            </li>
            <li className={`mr-5 text_color_inactive ${styles.listPoint}`}>
              <p className="text text_type_main-default">Белки, г</p>
              <span className="text text_type_digits-default">{ingredient.proteins}</span>
            </li>
            <li className={`mr-5 text_color_inactive ${styles.listPoint}`}>
              <p className="text text_type_main-default">Жиры, г</p>
              <span className="text text_type_digits-default">{ingredient.fat}</span>
            </li>
            <li className={`text_color_inactive ${styles.listPoint}`}>
              <p className="text text_type_main-default">Углеводы, г</p>
              <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
