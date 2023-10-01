import styles from "./Orders.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const Orders = () => {
  const props = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    status: "Готово",
    id: "3213213213",
  };
  const lala = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    status: "Выполнен",
    id: "3213213213",
  };

  const lolo = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    status: "Создан",
    id: "3213213213",
  };

  const array = [props, lala, lolo, props, props];

  const location = useLocation();

  return (
    <section>
      <ul className={`${styles.list} ${styles.scroll} custom-scroll mr-15`}>
        {array.map((el, index) => {
          return (
            <li key={index} className={styles.li}>
              <Link
                to={{ pathname: `/profile/orders/${el.id}` }}
                state={{ background: location }}
                className={styles.link}
              >
                <ListElement props={el} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const ListElement = ({ props }) => {
  const images = useSelector((store) => store.ingredients.ingredients);

  return (
    <div className={`ml-15 ${styles.listElement}`}>
      <div className={`mb-6 ${styles.numberAndTime}`}>
        <p className="text text_type_digits-default">{props.orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive">{props.time}</p>
      </div>
      <p className="text text_type_main-medium mb-2">{props.name}</p>
      <p className="mb-6 text text_type_main-default">{props.status}</p>
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
