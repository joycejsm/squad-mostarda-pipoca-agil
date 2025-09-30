import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/Checklist.svg"
          alt="Checklist"
          width={172}
          height={172}
          priority
        />
        <h1>Controle suas emoções e dinheiro</h1>
        <ul>
          <li>
            <Image
              src="/Checkmark.svg"
              alt="Checkmark"
              width={24}
              height={24}
              priority
            />
            <span>Controle automático de gastos</span> </li>
          <li>
            <Image
              src="/Checkmark.svg"
              alt="Checkmark"
              width={24}
              height={24}
              priority
            />
            <span>Registro de emoções nos gastos</span></li>
          <li>
            <Image
              src="/Checkmark.svg"
              alt="Checkmark"
              width={24}
              height={24}
              priority
            />
            <span>Metas financeiras personalizadas</span></li>
        </ul>
        <div className={styles.ctas}>
          <Link
            className={styles.primary}
            href="/register"
          >
            COMEÇAR AGORA
          </Link>
          <a
            href="#"
            className={styles.secondary}
          >
            JÁ TENHO CONTA
          </a>
        </div>
      </main>
    </div>
  );
}
