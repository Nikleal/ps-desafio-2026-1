import Image from "next/image";
import styles from "./banner.module.css";

export default function Banner() {
    return (
        <div className={styles.container}>
            <Image className={styles.bannerImage} src="/assets/images/Banner.png" alt="Banner" width={1200} height={300}/>
        </div>
    )
}