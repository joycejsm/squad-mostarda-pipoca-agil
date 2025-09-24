import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/Ellipse.svg"
          alt="Ellipse"
          width={172}
          height={172}
          priority
        />
        <h1>Controle suas emoções e dinheiro</h1>
        <ul>
          <li>
            <Image
              src="/bullet.svg"
              alt="bullet"
              width={18}
              height={18}
              priority
            />
            <span>Controle automático de gastos</span> </li>
          <li>
            <Image
              src="/bullet.svg"
              alt="bullet"
              width={18}
              height={18}
              priority
            />
            <span>Registro de emoções nos gastos</span></li>
          <li>
            <Image
              src="/bullet.svg"
              alt="bullet"
              width={18}
              height={18}
              priority
            />
            <span>Metas financeiras personalizadas</span></li>
        </ul>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="#"
          >
            COMEÇAR AGORA
          </a>
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
