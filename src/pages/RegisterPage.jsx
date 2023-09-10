import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { regUser } from "../services/actions/userData";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegSuccess = useSelector((store) => {
    return store.userData.registerUserSuccess;
  });

  const submitForm = (e) => {
    dispatch(regUser(loginValue, passwordValue, nameValue));
    e.preventDefault();
    return userRegSuccess
      ? (setLoginValue(""),
        setPasswordValue(""),
        setNameValue(""),
        navigate("/login", { replace: true }))
      : console.log("Произошла ошибка");
  };

  return (
    <div>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            type="text"
            value={nameValue}
            placeholder="Имя"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setLoginValue(e.target.value);
            }}
            type="email"
            value={loginValue}
            placeholder="E-mail"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type="password"
            value={passwordValue}
            icon={"HideIcon"}
            placeholder="Пароль"
          ></Input>
        </div>
        <div className={`${styles.button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large" onClick={submitForm}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div></div>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}>
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
