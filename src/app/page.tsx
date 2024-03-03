import styles from "./page.module.css";
import {PageWrapper} from "@/components/PageWrapper";
import {CloseButton} from "@/components/Button/CloseButton";
import {Header} from "@/components/Header/Header";
import Script from "next/script";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
        <Script
            async
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="beforeInteractive"
        />
      <div className={styles.description}>
          <PageWrapper>
              <Header>
                  <CloseButton name={'Close'}/>
                  <Link href={'/products'}>Products</Link>
              </Header>
          </PageWrapper>
      </div>
    </main>
  );
}
