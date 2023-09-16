import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AppHeader() {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" href="#" className={`mt-4 mb-4 mr-2 pt-4 pb-4 ${styles.element}`}>
          {location.pathname === "/" ? (
            <>
              <BurgerIcon type="primary" />
              <p className={`text text_type_main-default ml-2 mr-5 ${styles.navTextActive}`}>
                Конструктор
              </p>
            </>
          ) : (
            <>
              <BurgerIcon type="secondary" />
              <p className={`text text_type_main-default ml-2 mr-5`}>Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink href="#" className={`mt-4 mb-4 pt-4 pb-4 ${styles.element}`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default ml-2 mr-5">Лента заказов</p>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>

      <NavLink to="/profile/user" className={`mt-4 mb-4 pt-4 pb-4 ${styles.element}`}>
        {location.pathname.includes("/profile") ? (
          <>
            <ProfileIcon type="primary" />
            <p className={`text text_type_main-default ml-2 mr-5 ${styles.navTextActive}`}>
              Личный кабинет
            </p>
          </>
        ) : (
          <>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default ml-2 mr-5">Личный кабинет</p>
          </>
        )}
      </NavLink>
    </header>
  );
}

export default AppHeader;
