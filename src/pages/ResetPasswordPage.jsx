import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [emailCode, setEmailCode] = useState("");
	const submit = (e) => {
		e.preventDefault();
		setPasswordValue('')
		setEmailCode('')
	}
  return (
    <div>
      <form onSubmit={submit} className={styles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <div className="mb-6 mt-6">
          <Input
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
            type="password"
            value={passwordValue}
            placeholder="Введите новый пароль"
          ></Input>
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => {
              setEmailCode(e.target.value);
            }}
            type="text"
            value={emailCode}
            placeholder="Введите код из письма"
          ></Input>
        </div>
        <div className={`${styles.button} mb-20`}>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            onClick={() => {}}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <div></div>
      <p
        className={`text text_type_main-default text_color_inactive mb-4 ${styles.text}`}
      >
        Вспомнили пароль?
        <Link to="/register" className={styles.link}>
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
