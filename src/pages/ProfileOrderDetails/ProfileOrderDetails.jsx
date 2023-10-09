import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProfileOrderDetails.module.css";
import {
  wsProfileOrdersConnectionStop,
  wsProfileOrdersConnectionStart,
} from "../../services/actions/wsProfileOrdersData";
const ProfileOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredientsData = useSelector((store) => store.ingredients.ingredients);
  const orders = useSelector((store) => store.wsProfileOrders.orders);

  useEffect(() => {
    const token = localStorage.getItem("accessToken").replace("Bearer ", "");
    dispatch(
      wsProfileOrdersConnectionStart(`wss://norma.nomoreparties.space/orders?token=${token}`)
    );

    return () => {
      dispatch(wsProfileOrdersConnectionStop());
    };
  }, [dispatch]);

  const orderElement = useMemo(() => {
    return orders?.find((el) => {
      return el._id === id;
    });
  }, [orders]);

  const ingredients = useMemo(() => {
    return orderElement?.ingredients.map((ingredient) => {
      return ingredientsData.find((el) => {
        return el._id === ingredient;
      });
    });
  }, [orderElement, ingredientsData]);

  const totalPrice = useMemo(() => {
    return ingredients?.reduce((accumulator, item) => {
      return item.price + accumulator;
    }, 0);
  }, [ingredients]);

  return orderElement ? (
    <main className={`${styles.main}`}>
      <p className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
        #{orderElement.number}
      </p>

      <h1 className={`text text_type_main-medium mb-3 ${styles.textWrap}`}>{orderElement.name}</h1>
      {orderElement.status === "done" && (
        <p className={`mb-15 text text_type_main-default ${styles.textActive}`}>Выполнен</p>
      )}
      {orderElement.status === "created" && (
        <p className="mb-15 text text_type_main-default">Создан</p>
      )}
      {orderElement.status === "pending" && (
        <p className="mb-15 text text_type_main-default">Готовится</p>
      )}
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
        <p className="text text_type_main-default text_color_inactive">{orderElement.createdAt}</p>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon />
        </div>
      </div>
    </main>
  ) : (
    <h1 className={`text text_type_main-large ${styles.loading}`}>Загрузка</h1>
  );
};

export default ProfileOrderDetails;
