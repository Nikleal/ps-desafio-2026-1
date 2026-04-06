import Image from "next/image";
import Link from "next/link";
import syles from "./header.module.css";

export default function Header() {
    return (
        <header className={syles.header}>
            <div className={syles.container}>
                <Image src="/assets/images/logo.png" alt="logo" width={100} height={100}/>
                <div className={syles.headerLinks}>
                    <Link href="/" className={syles.headerLink}>Produtos</Link> 
                    <Link href="/" className={syles.headerLink}>Categorias</Link> 
                    <Link href="/" className={syles.headerLink}>Sobre</Link> 
                    <Link href="/" className={syles.headerLink}>Contato</Link> 
                </div>
            </div>
        </header>
    )
}