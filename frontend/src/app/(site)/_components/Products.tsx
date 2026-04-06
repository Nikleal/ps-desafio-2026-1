'use client'
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./products.module.css";
import { sportsItemType } from "@/types/sportsItem";
import { api } from "@/services/api";

export default function Products() {
    const [sportItem, setSportItem] = useState<sportsItemType[]>([]);

    useEffect(() => {
        async function getSportItems() {
           const {response, error} = await api('GET', '/instruments');

           if(response) {
            setSportItem(response as sportsItemType[]);
           }else {
            console.error(error?.message);
           }
        }
        getSportItems();
    }, [])
    
    return (
        <section className="products" id="products">
            <div className={styles.container}> 
                <h1 className={styles.title}>Nossos Produtos</h1>
                <div className={styles.productList}>
                    {sportItem.map((product) => (
                        <ProductCard key={product.id} {...product} />
                   ))}  
                </div>
            </div>
        </section>
    )
}
