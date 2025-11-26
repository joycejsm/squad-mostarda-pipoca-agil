import { MouseEventHandler, useState } from 'react';
import styles from './styles.module.css';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Modal(props: { onClose: MouseEventHandler<HTMLButtonElement>; }) {
  const navigate = useRouter()
  const [inputPass, setInputPass] = useState<string>("");
  const validPassPattern = /^(?=.*[A-Z])(?=.*[ -\/:-@\[-\`{-~])([0-9a-zA-ZÀ-ÖØ-öø-ÿ -\/:-@\[-\`{-~]){8,}$/; /* regex com o padrão permitido, faça o teste em https://regexr.com/ */

  const isValid: boolean = !!inputPass.match(validPassPattern);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPass(e.target.value);

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      console.log("A senha está válida");
      console.log(inputPass);
      navigate.push("/") // vai alterar a localização após um evento (por exemplo: eventos de formulário)
    }
  }

  return (
    <dialog open className={styles.modal}>
      <div className={styles.modalHeader}>
        <p className={styles.message}>Esqueci a senha</p>
        <button onClick={props.onClose}>
          <Image src="/close-icon-white.svg" alt="close-icon-white" width={20} height={20} priority />
        </button>
      </div>
      <form onSubmit={handleSubmit}>

        <label htmlFor="password">Informe nova senha:</label>
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

        <div className={styles.ctas}>
          <input className={`${styles.formButton} ${styles.primary}`}
            type="submit" value="ENVIAR" />
        </div>
      </form>

    </dialog>
  );
}