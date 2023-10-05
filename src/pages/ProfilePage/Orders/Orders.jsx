import styles from "./Orders.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { wsProfileOrdersConnectionStart } from "../../../services/actions/wsProfileOrdersData";
import { useEffect } from "react";
import ListElement from "./ListElement/ListElement";

export const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken").replace("Bearer ", "");
    dispatch(
      wsProfileOrdersConnectionStart(`wss://norma.nomoreparties.space/orders?token=${token}`)
    );
  }, [dispatch]);

  const orders = useSelector((store) => store.wsProfileOrders.orders);

  const location = useLocation();

  return (
    orders.length > 0 ? 
    (<section>
      <ul className={`${styles.list} ${styles.scroll} custom-scroll mr-15`}>
        {orders.map((el, index) => {
          return (
            <li key={index} className={styles.li}>
              <Link
                to={{ pathname: `/profile/orders/${el._id}` }}
                state={{ background: location }}
                className={styles.link}
              >
                <ListElement props={el} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>) : (<h1 className="text text_type_main-large">Загрузка</h1>)
  );
};
