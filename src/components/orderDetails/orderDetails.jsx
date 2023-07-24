import style from "./orderDetails.module.css";
import React from "react";
import imgDone from "../../images/done.svg";
import OrderContext from "../../services/orderContext";
import { useContext } from "react";
export default function OrderDetails() {
  const orderData = useContext(OrderContext);
  return (
    <React.Fragment>
      <div className={style.container}>
        <header className={`${style.header} mt-30 mb-8`}>
          <p className={`${style.orderData} text text_type_digits-large`}>
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
    </React.Fragment>
  );
}
