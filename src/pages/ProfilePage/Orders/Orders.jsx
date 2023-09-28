import styles from "./Orders.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export const Orders = () => {
  const props = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    img: "Тут будут картинки",
    status: "Готово",
  };
  const lala = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    img: "Тут будут картинки",
    status: "Выполнен",
  };

  const lolo = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    img: "Тут будут картинки",
    status: "Создан",
  };

  const array = [props, lala, lolo, props, props];
  return (
    <section>
      <ul className={`${styles.list} ${styles.scroll} custom-scroll mr-15`}>
        {array.map((el, index) => {
          return (
            <li key={index} className={styles.li}>
              <ListElement props={el} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const ListElement = ({ props }) => {
  return (
    <div className={`ml-15 ${styles.listElement}`}>
      <div className={`mb-6 ${styles.numberAndTime}`}>
        <p className="text text_type_digits-default">{props.orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive">{props.time}</p>
      </div>
      <p className="text text_type_main-medium mb-2">{props.name}</p>
      <p className="mb-6 text text_type_main-default">{props.status}</p>
      <div className={styles.imgAndPrice}>
        {props.img}
        <div className={styles.price}>
          <p className="mr-2 text text_type_digits-default">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
