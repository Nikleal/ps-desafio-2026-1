import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

import { 
    FaInstagram, 
    FaFacebook, 
    FaMapMarkerAlt, 
    FaEnvelope, 
    FaLinkedin, 
    FaGithub
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className={styles.footer} id="sobre">
            <div className={styles.container}>
                <div className={styles.aboutSection}>
                    <div className={styles.logoWrapper}>
                        <Image src="/assets/images/logoBocha.png" alt="Master Bocha Logo" width={50} height={50} />
                        <h2>Master Bocha</h2>
                    </div>
                    <p>
                        A Master Bocha nasceu da paixão pelo esporte de precisão mais tradicional do Brasil. 
                        Nosso objetivo é fornecer equipamentos de elite para atletas que buscam a "rafa" perfeita 
                        e o "ponto" de ouro, mantendo viva a tradição das canchas de saibro.
                    </p>
                </div>

                <div className={styles.contactSection} id="contato">
                <h3>Fale Conosco</h3>
                
                    <div className={styles.contactItem}>
                        <FaMapMarkerAlt className={styles.contactIcon} />
                        <span>Vila Pavão, Espírito Santo</span>
                    </div>

                    <div className={styles.contactItem}>
                        <FaEnvelope className={styles.contactIcon} />
                        <span>contato@masterbocha.com</span>
                    </div>
                    
                    <div className={styles.socials}>
                        <Link href="https://instagram.com" target="_blank" className={styles.socialLink}>
                            <FaInstagram size={24} />
                        </Link>
                        <Link href="https://facebook.com" target="_blank" className={styles.socialLink}>
                            <FaFacebook size={24} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/nicolas-leal-5602632a3/" target="_blank" className={styles.socialLink}>
                        <FaLinkedin size={24} title="LinkedIn" />
                        </Link>
                        <Link href="https://github.com/Nikleal" target="_blank" className={styles.socialLink}>
                            <FaGithub size={24} title="GitHub" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} Master Bocha. Todos os direitos reservados.</p>
                <p>Desenvolvido em Next.js</p>
            </div>
        </footer>
    );
}