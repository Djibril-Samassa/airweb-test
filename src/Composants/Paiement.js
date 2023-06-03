import React from "react";
import { useState } from "react";
import Style from "./Paiement.module.css";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Paiement(props) {
  return (
    <div className="t">
      <h1>Paiement</h1>
      <form className={Style.form}>
        <span>
          <label for="nom"> Nom</label>
          <input required type="text" placeholder="ex: John" />
          <label for="prenom"> Prénom</label>
          <input required type="text" placeholder="ex: Doe" />
        </span>
        <label for="email"> Adresse e-mail</label>
        <input required type="text" placeholder="ex: Jojohn@Doe.com" />
        <label for="adress"> Adresse postale</label>
        <input required type="text" placeholder="ex: 12 rue de la fontaine" />
        <span>
          <label for="cp"> Code Postal</label>
          <input required type="text" placeholder="ex: 75000" />
          <label for="city"> VIlle</label>
          <input required type="text" placeholder="ex: Paris" />
        </span>
        <label for="prenom"> Numero de la carte</label>
        <input required type="number" placeholder="ex: 0000 1111 2222 3333" />
        <label for="cvc"> CVC</label>
        <input required type="number" placeholder="ex: 123" />
        <div className={Style.buttons}>
          {/* Bouton de finalisation du paiement */}
          <Button type="submit" variant="success">
            Valider le paiement
          </Button>
          {/* Bouton d'annulation qui fait disparaitre le formulaire de paiement */}
          <Button
            variant="danger"
            onClick={() => {
              props.setIsPaying(false);
            }}
          >
            Annuler le paiement
          </Button>
        </div>
      </form>
    </div>
  );
}
