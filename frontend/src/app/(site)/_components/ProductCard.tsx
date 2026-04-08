'use client'
import Image from "next/image";
import styles from "./productCard.module.css";
import { sportsItemType } from "@/types/sportsItem";
import { ProductModal } from "./Product.Modal";


export default function ProductCard(sportItem: sportsItemType) {
    const fallbackImage = "/assets/images/placeholder.png";
    
    return (

        <ProductModal product ={sportItem}>
            <div className={styles.productCard}>
                <div className={styles.productImageContainer}>
                    <Image className={styles.productImage} src={sportItem?.image || fallbackImage} alt={sportItem?.name} width={300} height={200} />
                </div>
                <h1 className={styles.productName}>{sportItem.name}</h1>
                <div className={styles.productInfo}>
                <p className={styles.productCategory}>Categoria: {sportItem?.category?.name}</p>
                <p className={styles.productBrand}>Marca: {sportItem?.brand}</p>
                <p className={styles.productYear}>Ano: {sportItem?.year}</p>
                </div>
                <p className={styles.productPrice}>R${sportItem?.price}</p>
                <p className={styles.productStock}>Estoque: {sportItem?.amount}</p>
            </div>
        </ProductModal>
    )
}
