import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={`mt-4 mb-4 mr-2 pt-4 pb-4 ${styles.element}`}>
          <BurgerIcon type="primary" />
          <p
            className={`text text_type_main-default ml-2 mr-5 ${styles.navTextActive}`}
          >
            Конструктор
          </p>
        </a>
        <a href="#" className={`mt-4 mb-4 pt-4 pb-4 ${styles.element}`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default ml-2 mr-5">Лента заказов</p>
        </a>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <a href="#" className={`mt-4 mb-4 pt-4 pb-4 ${styles.element}`}>
        <ProfileIcon type="secondary" />
        <p
          className="text text_type_main-default ml-2 mr-5"
        >
          Личный кабинет
        </p>
      </a>
    </header>
  );
}

export default AppHeader;
