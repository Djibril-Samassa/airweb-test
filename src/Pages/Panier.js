import React, { useEffect, useState } from "react";
import Style from "./Panier.module.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Paiement from "../Composants/Paiement";
export default function Panier() {
  const [panier, setPanier] = useState([]);
  const [price, setPrice] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  useEffect(() => {
    fetchPanier();
  }, []);

  const fetchPanier = () => {
    const p = JSON.parse(localStorage.getItem("panier"));

    if (p && Array.isArray(p) && p.length > 0) {
      setPanier(p);
    } else {
      setPanier(null);
    }

    const sum = p.reduce((accumulator, product) => {
      return accumulator + product.price;
    }, 0);
    setPrice(sum);
  };

  const deleteFromBasket = (product) => {
    const newPanier = [...panier];
    const indexToDelete = panier.indexOf(product);
    newPanier.splice(indexToDelete, 1);
    localStorage.setItem("panier", JSON.stringify(newPanier));
    console.log(newPanier);
    fetchPanier();
  };

  return (
    <div className={Style.container}>
      <div className="t">
        <span style={{ display: "flex", alignItems: "center" }}>
          <Icon
            style={{ marginRight: "10px" }}
            className="buttonPrimary"
            icon="grommet-icons:basket"
            width="40"
            height="40"
          />{" "}
          <h1>Votre panier</h1>
        </span>
        {panier?.map((product) => {
          return (
            <div className={Style.product}>
              <div>
                <p>{product.label}</p>
                <p>{product.price} €</p>
              </div>
              <button
                className="buttonPrimary"
                onClick={() => {
                  deleteFromBasket(product);
                }}
              >
                X
              </button>
            </div>
          );
        })}
        {panier?.length > 0 ? (
          <div className={Style.product}>
            <span>{price}</span>
            <button
              className="buttonPrimary lb"
              onClick={() => {
                setIsPaying(true);
              }}
            >
              Passer au paiement
            </button>
          </div>
        ) : (
          <h1>C'est bien vide par ici...</h1>
        )}
        <div className={Style.bottom}>
          <Link className="link" to="/">
            <button className="buttonPrimary lb">Revenir à l'accueil</button>
          </Link>
        </div>
      </div>

      {isPaying && (
        <div className={Style.paiement}>
          <Paiement setIsPaying={setIsPaying} />
        </div>
      )}
    </div>
  );
}
