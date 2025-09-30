"use client" /*É necessário o "use client" para usar os Hooks do React*/
import styles from "./page.module.css"; /*arquivo de estilização*/

export default function Register() {
  return (
    <div className={styles.page}>
      <h1>cadastro de nome</h1>
      <p>Comece editando em <strong>app/register/page.tsx</strong></p>
      <p>Click em GoMoney no Header para voltar para o Início</p>
    </div>
  );
}

/*
Se precisar usar uma imagem coloque a imagem na pasta public

por exemplo public/Checklist.svg

*/