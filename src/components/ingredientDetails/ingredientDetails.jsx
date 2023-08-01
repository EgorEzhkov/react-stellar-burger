import styles from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";
export default function IngredientDetails() {
  const data = useSelector((store) => store.infoIngredient.infoIngredient);
  return (
    <>
      <div className={styles.container}>
        <header className={`ml-10 text text_type_main-large ${styles.header}`}>
          Детали ингредиента
        </header>
        <img
          width="480"
          height="240"
          src={data.image}
          alt={data.name}
          className={`mb-4 ${styles.image}`}
        />
        <p className={`mb-8 text text_type_main-medium ${styles.name}`}>
          {data.name}
        </p>
        <ul className={`${styles.list} mb-15`}>
          <li className={`mr-5 text_color_inactive ${styles.listPoint}`}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <span className="text text_type_digits-default">
              {data.calories}
            </span>
          </li>
          <li className={`mr-5 text_color_inactive ${styles.listPoint}`}>
            <p className="text text_type_main-default">Белки, г</p>
            <span className="text text_type_digits-default">
              {data.proteins}
            </span>
          </li>
          <li className={`mr-5 text_color_inactive ${styles.listPoint}`}>
            <p className="text text_type_main-default">Жиры, г</p>
            <span className="text text_type_digits-default">{data.fat}</span>
          </li>
          <li className={`text_color_inactive ${styles.listPoint}`}>
            <p className="text text_type_main-default">Углеводы, г</p>
            <span className="text text_type_digits-default">
              {data.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
