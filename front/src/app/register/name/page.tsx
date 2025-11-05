"use client" /*É necessário o "use client" para usar os Hooks do React*/
import { useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css"; /*arquivo de estilização*/
import Link from 'next/link';

export default function Name() {
  const navigate = useRouter()
  const [inputVal, setInputVal] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const validPattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ ]{3,144}$/; /* regex com o padrão permitido, faça o teste em https://regexr.com/ */
  const isValid: boolean = !!inputVal.trim() && !!inputVal.match(validPattern);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid && !isTyping) {
      console.log(inputVal);
      navigate.push("/register/user") // vai alterar a localização após um evento (por exemplo: eventos de formulário)
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
      <Image
        className={styles.logo}
        src="/avatar.svg"
        alt="avatar"
        width={128}
        height={128}
        priority
      />
      <h1>Como devemos te chamar?</h1>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.textForm}
          type='text'
          placeholder='Insira seu nome'
          value={inputVal}
          onChange={handleInputChange}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        />
        <br />
        <div className={styles.ctas}>
          <input className={`${styles.primary} ${isValid && !isTyping ? styles.enabled : styles.disabled}`}
            type="submit" value="CONTINUAR" />
        </div>
      </form>
    </div>
  );
}

/*
Se precisar usar uma imagem coloque a imagem na pasta public

por exemplo public/Checklist.svg

*/