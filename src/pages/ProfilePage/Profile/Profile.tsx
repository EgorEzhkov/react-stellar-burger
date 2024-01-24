import styles from "./Profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { useSelector, useDispatch } from "../../../utils/hooks";
import { postUserData } from "../../../services/actions/userData";
export const Profile = () => {
  const dispatch = useDispatch();

  const name = useSelector((store) => store.userData.userData.user.name);
  const login = useSelector((store) => store.userData.userData.user.email);

  const [loginValue, setLoginValue] = useState(login);
  const [passwordValue, setPasswordValue] = useState("паролянет((");
  const [nameValue, setNameValue] = useState(name);

  const [disabledName, setDisabledName] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);

  const submit = (e: FormEvent) => {
    e.preventDefault();
  };


  return (
    <div className={styles.inputs}>
      <form
        onSubmit={(e) => {
          return submit(e), setDisabledName(true), dispatch(postUserData(loginValue, nameValue));
        }}
        className="mb-6"
      >
        <Input
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
          type="text"
          icon={"EditIcon"}
          value={nameValue}
          placeholder={"Имя"}
          disabled={disabledName}
          onIconClick={() => {
            disabledName === false ? setDisabledName(true) : setDisabledName(false);
          }}
        ></Input>
      </form>
      <form
        onSubmit={(e) => {
          return submit(e), setDisabledLogin(true), dispatch(postUserData(loginValue, nameValue));
        }}
        className="mb-6"
      >
        <Input
          onChange={(e) => {
            setLoginValue(e.target.value);
          }}
          type="email"
          icon={"EditIcon"}
          value={loginValue}
          placeholder={"Логин"}
          disabled={disabledLogin}
          onIconClick={() => {
            disabledLogin === false ? setDisabledLogin(true) : setDisabledLogin(false);
          }}
        ></Input>
      </form>
      <div className="mb-6">
        <Input
          onChange={(e) => {
            setPasswordValue(e.target.value);
          }}
          type={"password"}
          icon={"EditIcon"}
          value={passwordValue}
          placeholder={"Пароль"}
          disabled={true}
        ></Input>
      </div>
    </div>
  );
};
