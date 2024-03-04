import styles from "./page.module.css";
import {User} from "@/components/User/User";

export default function Home() {
  return (
      <div className={styles.description}>
          <h1>MAIN PAGE</h1>
          <br/>
          <User />
      </div>
  );
}
