import styles from "./OrderDetails.module.css";
import imgDone from "../../images/done.svg";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const orderData = useSelector((store) => store.orderData.orderNumber);
  return (
    <div className={styles.container}>
      <header className={`${styles.header} mt-30 mb-8`}>
        <p className={`${styles.orderData} text text_type_digits-large`}>
          {orderData}
        </p>
      </header>
      <div></div>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={imgDone} alt="" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
