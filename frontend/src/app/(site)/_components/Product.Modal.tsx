"use client";

import { useState, ReactNode } from "react";
import styles from "./productModal.module.css";
import Image from "next/image";
import { sportsItemType } from "@/types/sportsItem";
import { buySportsItem } from "@/actions/sportsItem";

interface ProductModalProps {
  product: sportsItemType;
  children: ReactNode;
}

export function ProductModal({ product, children }: ProductModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setQuantity(1);
  };

  const fallbackImage = "https://picsum.photos/300/200?random=" + product?.id;

  const totalPrice = (Number(product?.price) * quantity).toFixed(2).replace('.', ',');

  const increment = () => {
    if (quantity < product.amount) setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const submit = async (form: FormData) => {
    const response = await buySportsItem(form);
    const { error } = JSON.parse(response);

    if (error) {
      console.error("Erro ao comprar o produto:", error);
      alert("Não foi possível realizar a compra.");
    } else {
      console.log("Produto comprado com sucesso!");
      closeModal();
      window.location.reload();
    }
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>

      {isOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>

            <div className={styles.modalContent}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.modalImage}
                  src={product?.image || fallbackImage}
                  alt={product?.name}
                  width={400}
                  height={300}
                />
              </div>

              <div className={styles.details}>
                <h2 className={styles.title}>{product?.name}</h2>
                <p className={styles.info}>
                  <strong>Categoria:</strong> {product?.category?.name}
                </p>
                <p className={styles.info}>
                  <strong>Marca:</strong> {product?.brand}
                </p>
                <p className={styles.info}>
                  <strong>Ano:</strong> {product?.year}
                </p>
                <p className={styles.stock}>
                  Estoque disponível: <span>{product?.amount}</span>
                </p>

                <p className={styles.price}>R$ {totalPrice}</p>

                <form action={submit}>
                  <input type="hidden" name="id" value={product?.id} />
                  <input type="hidden" name="amount" value={quantity} />

                  <div className={styles.productActions}>
                    <button
                      type="button"
                      className={styles.decrement}
                      onClick={decrement}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>

                    <span className={styles.quantityDisplay}>{quantity}</span>

                    <button
                      type="button"
                      className={styles.increase}
                      onClick={increment}
                      disabled={quantity >= product.amount}
                    >
                      +
                    </button>

                    <button
                      type="submit"
                      className={styles.addToCartButton}
                      disabled={product?.amount <= 0}
                    >
                      {product?.amount > 0 ? "Comprar" : "Esgotado"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}