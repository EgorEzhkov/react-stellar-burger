import style from "./ingredientDetails.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
export default function ingredientDetails({ data }) {
  return (
    <>
      <div className={style.container}>
        <header className={`ml-10 text text_type_main-large ${style.header}`}>
          Детали ингредиента
        </header>
        <img
          width="480"
          height="240"
          src={data.image}
          alt={data.name}
          className={`mb-4 ${style.image}`}
        />
        <p className={`mb-8 text text_type_main-medium ${style.name}`}>
          {data.name}
        </p>
        <ul className={`${style.list} mb-15`}>
          <li className={`mr-5 text_color_inactive ${style.listPoint}`}>
            <p className="text text_type_main-default">Калории,ккал</p>
            <span className="text text_type_digits-default">
              {data.calories}
            </span>
          </li>
          <li className={`mr-5 text_color_inactive ${style.listPoint}`}>
            <p className="text text_type_main-default">Белки, г</p>
            <span className="text text_type_digits-default">
              {data.proteins}
            </span>
          </li>
          <li className={`mr-5 text_color_inactive ${style.listPoint}`}>
            <p className="text text_type_main-default">Жиры, г</p>
            <span className="text text_type_digits-default">{data.fat}</span>
          </li>
          <li className={`text_color_inactive ${style.listPoint}`}>
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

ingredientDetails.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
};
