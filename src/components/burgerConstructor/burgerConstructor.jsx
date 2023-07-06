import {
  CurrencyIcon,
  ConstructorElement,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructor.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
function BurgerConstructor({ data, handlePopupState }) {
  const totalPrice = data.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );
  return (
    <>
      <div
        className={`mt-25 mb-10 ml-10 ${styles.container}`}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div style={{ display: "flex", whiteSpace: "pre-wrap" }}>
          <ConstructorElement
            type="top"
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
            isLocked={true}
          />
        </div>

        <ul
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          className={`custom-scroll ${styles.listConsctructor}`}
        >
          {data.map((el) => {
            return ConstructorList(el);
          })}
        </ul>
        <div style={{ display: "flex", whiteSpace: "pre-wrap" }}>
          <ConstructorElement
            type="bottom"
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
            isLocked={true}
          />
        </div>
      </div>
      <div className={styles.finalPrice}>
        <p className="text text_type_digits-medium mr-10">
          {totalPrice}
          <CurrencyIcon />
        </p>
        <Button
          onClick={() => handlePopupState(true)}
          htmlType="button"
          type="primary"
          size="large"
        >
          Нажми на меня
        </Button>
      </div>
    </>
  );
}

function ConstructorList(el) {
  if (el.type !== "bun") {
    return (
      <li key={el._id} className={`${styles.li}`}>
        <div className={styles.constructorElement}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={el.name}
            price={el.price}
            thumbnail={el.image}
          />
        </div>
      </li>
    );
  }
}

BurgerConstructor.propTypes = {
  handlePopupState: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(ingredientPropType),
};

export default BurgerConstructor;
