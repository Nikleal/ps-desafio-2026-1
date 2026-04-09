'use client'
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./products.module.css";
import { sportsItemType } from "@/types/sportsItem";
import { api } from "@/services/api";
import { useSearchParams } from "next/navigation";

export default function Products() {
	const [sportItem, setSportItem] = useState<sportsItemType[]>([]);
	const searchParams = useSearchParams();
	const categoryId = searchParams.get("category_id");
 
	useEffect(() => { 
		async function getSportItems() {
			const route = categoryId ? `products?category_id=${categoryId}`: "/products";
			const { response, error } = await api('GET', route);

			if (response) {
				setSportItem(response as sportsItemType[]);
			} else { 
				console.error(error?.message);
			}
		}
		getSportItems();
	}, [categoryId]);

	return (
		<section className="products" id="products">
			<div className={styles.container}>
				<h1 id="produtos" className={styles.title}>Nossos Produtos</h1>
				<div className={styles.productList}>
					{sportItem.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			</div>
		</section>
	)
}
