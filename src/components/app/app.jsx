import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";

function App() {
  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "0",
      	fontSize: "1.5rem"
      }}>
        <header><AppHeader /></header>
        <main className={styles.main}>
          <div className={styles.div}>
            <BurgerIngredients/>
          </div>
        
          <div>fdsa</div>
        </main>
        
      </pre>
    </div>
  );
}

export default App;
