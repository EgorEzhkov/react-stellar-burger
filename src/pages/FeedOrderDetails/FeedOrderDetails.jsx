import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./FeedOrderDetails.module.css";
import { wsOrdersFeedConnectionStart } from "../../services/actions/wsOrdersFeedData";
const FeedOrderDetails = () => {
  const { id } = useParams();

  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const orders = useSelector((store) => store.wsOrdersFeed.orders);

  const orderElement = useMemo(() => {
    return orders.find((el) => {
      return el._id === id;
    });
  }, [orders]);

  const ingredients = useMemo(() => {
    return orderElement.ingredients.map((ingredient) => {
      return ingredientsData.find((el) => {
        return el._id === ingredient;
      });
    });
  }, [orderElement, ingredientsData]);

  const totalPrice = useMemo(() => {
    return ingredients.reduce((accumulator, item) => {
      return item.price + accumulator;
    }, 0);
  }, [ingredients]);

  const { createdAt, name, number, status } = orderElement;

  return (
    <main className={`${styles.main}`}>
      <p className={`${styles.orderNumber} text text_type_digits-default mb-10`}>#{number}</p>

      <h1 className="text text_type_main-medium mb-3">{name}</h1>
      {status === "done" && (
        <p className={`mb-15 text text_type_main-default ${styles.textActive}`}>Выполнен</p>
      )}
      {status === "created" && <p className="mb-15 text text_type_main-default">Создан</p>}
      {status === "pending" && <p className="mb-15 text text_type_main-default">Готовится</p>}
      <h2 className="mb-6 text text_type_main-medium">Состав:</h2>
      <ul className={`${styles.list} ${styles.scroll} custom-scroll`}>
        {ingredients.map((el, index) => {
          return (
            <li className={`${styles.listElement} mr-6`} key={index}>
              <div className={styles.imgAndName}>
                <img src={el.image} className={`${styles.image} mr-4`} />
                <p className={`text text_type_main-default ${styles.name}`}>{el.name}</p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{el.price}</p>
                <CurrencyIcon />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.timeAndTotalPrice}>
        <p className="text text_type_main-default text_color_inactive">{createdAt}</p>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon />
        </div>
      </div>
    </main>
  );
};

export default FeedOrderDetails;
