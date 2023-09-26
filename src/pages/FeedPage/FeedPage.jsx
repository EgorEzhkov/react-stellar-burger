import styles from "./FeedPage.module.css";
import ListElement from "./ListElement/ListElement";

const FeedPage = () => {
  const props = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    img: "Тут будут картинки",
  };

  const atWork = [42314, 432, 4321, 4324, 3421];
  const prepared = [4314, 4532, 4651, 654, 6867, 2435, 87568];
  const readyAllTime = "43124";
  const readyToDay = "32";

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-4">Лента заказов</h1>
      <main className={styles.main}>
        <ul className={`${styles.scroll} custom-scroll mr-15`}>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
          <li className={styles.listElement}>
            <ListElement props={props} />
          </li>
        </ul>
        <div>
          <div className={`mb-15 ${styles.scoreboard}`}>
            <div className={styles.scoreboardElement}>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <p className={`text text_type_digits-default ${styles.prepared}`}>
                {prepared.map((el) => {
                  return <p className={`text ${styles.columnNumber}`}>{el}</p>;
                })}
              </p>
            </div>
            <div>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <p className={`text text_type_digits-default ${styles.atWork}`}>
                {atWork.map((el) => {
                  return <p className={`text ${styles.columnNumber}`}>{el}</p>;
                })}
              </p>
            </div>
          </div>
          <div className="mb-15">
            <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
            <p className={`text text_type_digits-large ${styles.number}`}>{readyAllTime}</p>
          </div>
          <div>
            <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className={`text text_type_digits-large ${styles.number}`}>{readyToDay}</p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default FeedPage;
