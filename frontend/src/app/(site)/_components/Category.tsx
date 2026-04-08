"use client";

import { api } from "@/services/api";
import { CategoryType } from "@/types/category";
import { useEffect, useState } from "react";
import styles from "./category.module.css";

export default function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function getCategories() {
      const { response, error } = await api("GET", "/category");

      if (response) {
        setCategories(response as CategoryType[]);
      } else {
        console.error(error?.message);
      }
    }
    getCategories();
  }, []);

  return (
    <section className="products" id="products">
      <div className={styles.container}>
        <h1 id="produtos" className={styles.title}>
          CATEGORIAS
        </h1>
        <div className={styles.productList}>
          {categories.map((item) => (
            <div key={item.id} className={styles.categoryCard}>
              <h2>{item.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}