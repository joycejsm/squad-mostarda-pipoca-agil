"use client" /*É necessário o "use client" para usar os Hooks do React*/
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css"; /*arquivo de estilização*/
import Link from 'next/link';

export default function User() {
  const navigate = useRouter()
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPass, setInputPass] = useState<string>("");
  const validEmailPattern = /^([\w-]+\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/; /* regex com o padrão permitido, faça o teste em https://regexr.com/ */
  const validPassPattern = /^(?=.*[A-Z])(?=.*[!$*&@#])(?:([0-9a-zA-Z!$*&@#])(?!\1)){8,}$/; /* regex com o padrão permitido, faça o teste em https://regexr.com/ */

  // const validPassPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$*&@#])(?:([0-9a-zA-Z!$*&@#])(?!\1)){8,}$/; /* regex com o padrão permitido, faça o teste em https://regexr.com/ */
  const isValid: boolean = !!inputPass.match(validPassPattern) && !!inputEmail.match(validEmailPattern);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);

  };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPass(e.target.value);

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      console.log("O email e a senha estão válidos");
      console.log(inputEmail);
      console.log(inputPass);
      navigate.push("/") // vai alterar a localização após um evento (por exemplo: eventos de formulário)
    }
  }

  return (
    <div className={styles.page}>
      <Link href="/">
        <Image
          src="/close-icon.svg"
          alt="close-icon"
          width={24}
          height={24}
          priority
        />
      </Link>

      <h1>Seja bem-vindo</h1>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.textForm}
          type='text'
          placeholder='contato@gmail.com'
          value={inputEmail}
          onChange={handleEmailChange}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
        <input
          className={styles.textForm}
          type='text'
          placeholder='Escreva sua senha'
          value={inputPass}
          onChange={handlePasswordChange}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
        <br />
        <div className={styles.ctas}>
          {/* <input className={`${styles.primary} ${isValid && !isTyping ? styles.enabled : styles.disabled}`}
            type="submit" value="CONTINUAR" /> */}
          <input className={`${styles.primary} ${styles.enabled}`}
            type="submit" value="REGISTRAR-SE" />
        </div>
      </form>
    </div>
  );
}

/*
Se precisar usar uma imagem coloque a imagem na pasta public

por exemplo public/Checklist.svg

*/