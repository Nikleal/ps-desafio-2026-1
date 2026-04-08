import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Image src="/assets/images/logoBocha.png" alt="logo" width={100} height={100}/>
                <div className={styles.headerLinks}>
                    <Link href="#produtos" className={styles.headerLink}>Produtos</Link> 
                    <Link href="#sobre" className={styles.headerLink}>Sobre</Link> 
                    <Link href="#contato" className={styles.headerLink}>Contato</Link> 
                    <Link href="/admin" className={styles.headerLink}>Administrador</Link>                     
                </div>
            </div>
        </header>
    )
}