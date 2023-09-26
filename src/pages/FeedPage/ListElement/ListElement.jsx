import styles from "./ListElement.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const ListElement = ({props}) => {
  return (
    <div className={styles.listElement}>
      <div className={`mb-6 ${styles.numberAndTime}`}>
        <p className="text text_type_digits-default">{props.orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive">{props.time}</p>
      </div>
      <p className="text text_type_main-medium mb-6">{props.name}</p>
      <div className={styles.imgAndPrice}>
        {props.img}
        <div className={styles.price}>
          <p className="mr-2 text text_type_digits-default" >{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default ListElement;
