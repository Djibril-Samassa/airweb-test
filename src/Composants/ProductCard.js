import React, { useState } from "react";
import Style from "./ProductCard.module.css";
import { Icon } from "@iconify/react";
export default function ProductCard(props) {
  const [produit, setProduit] = useState(props.produit);
  const addToBasket = (produit) => {
    const existingPanier = localStorage.getItem("panier");
    let panierArray = [];

    if (existingPanier) {
      try {
        panierArray = JSON.parse(existingPanier);

        if (!Array.isArray(panierArray)) {
          throw new Error("Le panier existant n'est pas un tableau valide.");
        }
      } catch (error) {
        console.error(error);
        panierArray = [];
      }
    }

    panierArray.push(produit);

    localStorage.setItem("panier", JSON.stringify(panierArray));
  };

  return (
    <div className={Style.container}>
      <img className={Style.image} src={produit.thumbnail_url} />
      <div>
        <div className={Style.description}>
          <h3>{produit.label}</h3>
          <p>{produit.description}</p>
        </div>
        <div className={Style.bottom}>
          <p>{produit.price} €</p>
          <button
            onClick={() => {
              addToBasket(produit);
            }}
            className="buttonPrimary"
          >
            {" "}
            <Icon
              style={{ marginRight: "10px" }}
              icon="grommet-icons:basket"
              width="20"
              height="20"
            />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
