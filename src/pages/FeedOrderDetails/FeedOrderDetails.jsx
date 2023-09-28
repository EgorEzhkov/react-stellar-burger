import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./FeedOrderDetails.module.css";

const FeedOrderDetails = () => {
  const { id } = useParams();
  console.log(id);

  const img = useSelector((store) => store.ingredients.ingredients[5]);

  const props = {
    name: "Death Star Starship Main бургер",
    price: 3213,
    orderNumber: "#3213",
    time: "Сегодня, 16:20 i-GMT+3",
    img: "Тут будут картинки",
    status: "Выполнен",
    totalPrice: "213213",
  };

  const ingredients = [
    { img: "fds", name: "nfdsaffdsafhgfdhgdshfdgsafdsagdasame", price: "321" },
    { img: "img2", name: "name2", price: "3212" },
    { img: "img3", name: "name3", price: "3213" },
    { img: "img4", name: "name4", price: "32134" },
    { img: "img5", name: "name5", price: "32135" },
    { img: "img34", name: "name43", price: "32113" },
    { img: "ifg3", name: "namef3", price: "3f213" },
  ];

  return (
    <main className={`${styles.main}`}>
      <p className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
        {props.orderNumber}
      </p>

      <h1 className="text text_type_main-medium mb-3">{props.name}</h1>
      <p className="mb-15 text text_type_main-default">{props.status}</p>
      <h2 className="mb-6 text text_type_main-medium">Состав:</h2>
      <ul className={`${styles.list} ${styles.scroll} custom-scroll`}>
        {ingredients.map((el, index) => {
          return (
            <li className={`${styles.listElement} mr-6`} key={index}>
              <div className={styles.imgAndName}>
                {img && <img src={img.image} className={`${styles.image} mr-4`} />}
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
        <p className="text text_type_main-default text_color_inactive">{props.time}</p>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default mr-2">{props.totalPrice}</p>
          <CurrencyIcon />
        </div>
      </div>
    </main>
  );
};

export default FeedOrderDetails;
