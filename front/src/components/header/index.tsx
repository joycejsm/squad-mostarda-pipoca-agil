import styles from './styles.module.scss';
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">GoMoney</Link>
    </header>
  )
}