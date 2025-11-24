"use client" /*É necessário o "use client" para usar os Hooks do React*/
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css"; /*arquivo de estilização*/
import Link from 'next/link';
import Modal from './modal';

export default function Login() {
  const navigate = useRouter()
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPass, setInputPass] = useState<string>("");
  const validEmailPattern = /^([\w-]+\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/; /* regex com o padrão permitido, faça o teste em https://regexr.com/ */
  const validPassPattern = /^(?=.*[A-Z])(?=.*[ -\/:-@\[-\`{-~])([0-9a-zA-ZÀ-ÖØ-öø-ÿ -\/:-@\[-\`{-~]){8,}$/; /* regex com o padrão permitido, faça o teste em https://regexr.com/ */

  const isValid: boolean = !!inputPass.match(validPassPattern) && !!inputEmail.match(validEmailPattern);

  const [modalStatus, setModalStatus] = useState(false)
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
      <div className={styles.navContainer}>
        <Link href="/">
          <Image
            src="/Arrow_back.svg"
            alt="Arrow_back"
            width={24}
            height={24}
            priority
          />
        </Link>
        <Link href="/">
          <Image
            src="/close-icon.svg"
            alt="close-icon"
            width={24}
            height={24}
            priority
          />
        </Link>
      </div>

      <h1>Seja bem-vindo novamente</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Seu email</label>
        <input
          className={styles.textForm}
          type='text'
          name='email'
          placeholder='contato@gmail.com'
          value={inputEmail}
          onChange={handleEmailChange}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
        <label htmlFor="password">Sua senha</label>
        <input
          className={styles.textForm}
          type='password'
          name='password'
          placeholder='Escreva sua senha'
          value={inputPass}
          onChange={handlePasswordChange}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="checkbox1" name="checkbox1" value="Checkbox1" />
          <label htmlFor="checkbox1">Mantenha-me conectado</label> <br />
        </div>
        {/* <div className={styles.checkboxContainer}>
          <input type="checkbox" id="checkbox2" name="checkbox2" value="Checkbox2" />
          <label htmlFor="checkbox2">Concordo com as Leis LGPD</label> <br />
        </div> */}
        <div  onClick={() => {
        setModalStatus(!modalStatus);}}><p>Esqueci a senha</p>
        </div>
        <br />

        <Image
          src="/Social_media_collection.svg"
          alt="Social_media_collection.svg"
          // width={329}
          width={300}
          height={24}
          priority
        />

        <div className={styles.ctas}>
          <input className={`${styles.formButton} ${styles.primary}`}
            type="submit" value="FAZER LOGIN" />
          <Link
            href="/register/name"
            className={`${styles.formButton} ${styles.secondary}`}
          >
            CRIAR CONTA
          </Link>
        </div>
      </form>
      {modalStatus ? <Modal /> : null}
    </div>
  );
}

/*
Se precisar usar uma imagem coloque a imagem na pasta public

por exemplo public/Checklist.svg

*/