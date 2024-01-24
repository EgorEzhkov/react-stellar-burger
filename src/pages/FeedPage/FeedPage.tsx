import styles from "./FeedPage.module.css";
import ListElement from "./ListElement/ListElement";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/hooks";
import { useEffect } from "react";
import { wsOrdersFeedConnectionStart, wsOrdersFeedConnectionStop } from "../../services/actions/wsOrdersFeedData";
const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsOrdersFeedConnectionStart("wss://norma.nomoreparties.space/orders/all"));

    return () => {
      dispatch(wsOrdersFeedConnectionStop());
    };
  }, [dispatch]);

  const location = useLocation();

  const { orders, totalToday, total } = useSelector((store) => store.wsOrdersFeed);

  return orders.length > 0 ? (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-4">Лента заказов</h1>
      <main className={styles.main}>
        <ul className={`${styles.scroll} custom-scroll mr-15`}>
          {orders.length > 0 &&
            orders.map((el, index) => {
              return (
                <li className={styles.listElement} key={index}>
                  <Link to={{ pathname: `/feed/${el._id}` }} state={{ background: location }} className={styles.link}>
                    <ListElement props={el} />
                  </Link>
                </li>
              );
            })}
        </ul>
        <div>
          <div className={`mb-15 ${styles.scoreboard}`}>
            <div className={styles.scoreboardElement}>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <div className={`text text_type_digits-default ${styles.prepared}`}>
                {orders.map((el, index) => {
                  return (
                    index <= 19 &&
                    el.status === "done" && (
                      <p key={index} className={`text ${styles.columnNumber}`}>
                        {el.number}
                      </p>
                    )
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <div className={`text text_type_digits-default ${styles.atWork}`}>
                {orders.map((el, index) => {
                  return (
                    index <= 19 &&
                    el.status === "pending" && (
                      <p key={index} className={`text ${styles.columnNumber}`}>
                        {el.number}
                      </p>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mb-15">
            <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
            <p className={`text text_type_digits-large ${styles.number}`}>{total}</p>
          </div>
          <div>
            <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className={`text text_type_digits-large ${styles.number}`}>{totalToday}</p>
          </div>
        </div>
      </main>
    </section>
  ) : (
    <h1>Загрузка</h1>
  );
};

export default FeedPage;
