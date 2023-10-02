import styles from "./FeedPage.module.css";
import ListElement from "./ListElement/ListElement";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { wsOrdersFeedConnectionStart } from "../../services/actions/wsOrdersFeedData";
const FeedPage = () => {
  const atWork = [42314, 432, 4321, 4324, 3421];
  const prepared = [4314, 4532, 4651, 654, 6867, 2435, 87568];
  const location = useLocation();

  const dispatch = useDispatch();

  const { orders, totalToday, total } = useSelector((store) => store.wsOrdersFeed);

  useEffect(() => {
    dispatch(wsOrdersFeedConnectionStart("wss://norma.nomoreparties.space/orders/all"));
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-4">Лента заказов</h1>
      <main className={styles.main}>
        <ul className={`${styles.scroll} custom-scroll mr-15`}>
          {orders.length > 0 &&
            orders.map((el, index) => {
              return (
                <li className={styles.listElement} key={index}>
                  <Link
                    to={{ pathname: `/feed/${el._id}` }}
                    state={{ background: location }}
                    className={styles.link}
                  >
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
                {prepared.map((el, index) => {
                  return (
                    <p key={index} className={`text ${styles.columnNumber}`}>
                      {el}
                    </p>
                  );
                })}
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <div className={`text text_type_digits-default ${styles.atWork}`}>
                {atWork.map((el, index) => {
                  return (
                    <p key={index} className={`text ${styles.columnNumber}`}>
                      {el}
                    </p>
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
  );
};

export default FeedPage;
