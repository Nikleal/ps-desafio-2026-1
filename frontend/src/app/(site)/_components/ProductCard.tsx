import Image from "next/image";
import Link from "next/link";
import styles from "./productCard.module.css";
import { sportsItemType } from "@/types/sportsItem";

export default function ProductCard(sportItem: sportsItemType) {
    const fallbackImage = "/assets/images/placeholder.png";
    return (
        <div className={styles.productCard}>
            <Link href={`/product/${sportItem?.id}`} className={styles.productLink}>
                <Image className={styles.productImage} src={sportItem?.image || fallbackImage} alt={sportItem?.name} width={300} height={200} />
            </Link>
            <h1 className={styles.productName}>{sportItem.name}</h1>
            <p className={styles.productCategory}>Categoria: {sportItem?.category?.name}</p>
            <p className={styles.productBranch}>Marca: {sportItem?.brand}</p>
            <p className={styles.productYear}>Ano: {sportItem?.year}</p>
            <p className={styles.productPrice}>R${sportItem?.price}</p>
            <p className={styles.productStock}>Estoque: {sportItem?.amount}</p>
            {sportItem?.amount > 0 ? (
                <button className={styles.productButton}>Comprar</button>
            ) : (
                <button className={styles.productButton} disabled>Produto Indisponível</button>
            )}
        </div>
    )
} 