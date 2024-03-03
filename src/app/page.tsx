import styles from "./page.module.css";
import {PageWrapper} from "@/components/PageWrapper";
import {CloseButton} from "@/components/CloseButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        It works
          <PageWrapper>
              <CloseButton name={'Close'}/>
          </PageWrapper>
      </div>
    </main>
  );
}
