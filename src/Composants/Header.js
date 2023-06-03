import React, { useEffect, useState } from "react";
import Style from "./Header.module.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function Header() {
  const [pastille, setPastille] = useState(null);

  useEffect(() => {
    initialisePastille();
  }, []);

  // Mettre au dessus de l'icone du panier le nombre d'articles dedans
  const initialisePastille = () => {
    const panier = JSON.parse(localStorage.getItem("panier"));

    if (panier && Array.isArray(panier) && panier.length > 0) {
      setPastille(panier.length);
    } else {
      setPastille(null);
    }
  };

  return (
    <div className={Style.container}>
      <Link className="link" to="/">
        <Icon icon="pepicons-pop:house" width="40" />
      </Link>
      <Link className="link" to="/panier">
        <span className={Style.pastilleWrapper}>
          <Icon
            className="buttonPrimary"
            icon="grommet-icons:basket"
            width="40"
            height="40"
          />
          {pastille && <span className={Style.pastille}>{pastille}</span>}
        </span>
      </Link>
    </div>
  );
}
