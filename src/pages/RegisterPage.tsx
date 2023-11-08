import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { regUser } from "../services/actions/userData";
import { useDispatch } from "react-redux";
import { usePasswordShow } from "../utils/hooks";
import { useSelector } from "../utils/hooks";

const RegisterPage = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const passwordShow = usePasswordShow();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegSuccess = useSelector((store) => {
    return store.userData.registerUserSuccess;
  });

  const submitForm = (e: FormEvent) => {
    dispatch(regUser(loginValue, passwordValue, nameValue));
    e.preventDefault();
    return userRegSuccess && (setLoginValue(""), setPasswordValue(""), setNameValue(""), navigate("/login", { replace: true }));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
        className={styles.form}
      >
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
            type={`${passwordShow.type}`}
            value={passwordValue}
            icon={`${passwordShow.icon}`}
            placeholder="Пароль"
            onIconClick={() => passwordShow.showPassword()}
          ></Input>
        </div>
        <div className={`${styles.button} mb-20`}>
          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div></div>
      <p className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}>
        Уже зарегистрированы?&nbsp;
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
