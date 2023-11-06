import { CurrencyIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiOrder } from "../../services/actions/orderDetailsData";
import { useDrop } from "react-dnd";
import { deleteIngredient, postIngredient } from "../../services/actions/constructorIngredientsData";
import ConstructorElements from "./ConstructorElements/ConstructorElements";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { TIngredient } from "../../types/types";

interface IProps {
  handlePopupState: Function;
}

const BurgerConstructor: FC<IProps> = ({ handlePopupState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.userData.isAuthenticated);
  const dataIngredient = useSelector((store) => store.dataConstructor.ingredients);
  const dataBuns = useSelector((store) => store.dataConstructor.bun);

  const burgerData = [dataBuns[0], ...dataIngredient, dataBuns[1]];
  const totalPrice = useMemo(() => {
    const dataConstructor = [...dataIngredient, ...dataBuns];
    return dataConstructor.reduce((accumulator, item) => {
      return item.price + accumulator;
    }, 0);
  }, [dataBuns, dataIngredient]);

  function apiOrderData(handlePopupState: Function, dataIngredient: ReadonlyArray<TIngredient>) {
    handlePopupState(true);
    dispatch(getApiOrder(dataIngredient));
  }

  const [buttonState, setButtonState] = useState<boolean>(false);

  useEffect(() => {
    if (dataIngredient.length > 0 && dataBuns.length > 0) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [dataIngredient, dataBuns]);

  const [, ref] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      dispatch(postIngredient({ ...item, uniqueId: uuidv4() }));
    },
  });

  const onClickButton = () => {
    if (userData) {
      apiOrderData(handlePopupState, burgerData);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className={`mt-25 mb-10 ml-10 ${styles.container}`} ref={ref}>
        <div className={styles.constructorElementContainer}>
          {dataBuns.length > 0 ? (
            <ConstructorElement
              type="top"
              text={`${dataBuns[0].name} (верх)`}
              price={dataBuns[0].price}
              thumbnail={dataBuns[0].image}
              isLocked={true}
            />
          ) : (
            <p>Выбери булку</p>
          )}
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
          {dataIngredient.length > 0 ? (
            dataIngredient.map((el: TIngredient, index: number) => {
              return <ConstructorElements el={el} index={index} func={deleteIngredient} key={el.uniqueId} />;
            })
          ) : (
            <p>Выбери ингредиенты</p>
          )}
        </ul>

        {dataBuns.length > 0 ? (
          <div className={styles.constructorElementContainer}>
            <ConstructorElement
              type="bottom"
              text={`${dataBuns[0].name} (низ)`}
              price={dataBuns[0].price}
              thumbnail={dataBuns[0].image}
              isLocked={true}
            />
          </div>
        ) : (
          <p>Выбери булку</p>
        )}
      </div>
      <div className={styles.finalPrice}>
        <p className="text text_type_digits-medium mr-10">
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
        <Button onClick={() => onClickButton()} htmlType="button" type="primary" size="large" disabled={buttonState}>
          Нажми на меня
        </Button>
      </div>
    </>
  );
};

export default BurgerConstructor;
