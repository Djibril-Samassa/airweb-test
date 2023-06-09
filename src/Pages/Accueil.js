import axios, { Axios } from "axios";
import React from "react";
import ProductCard from "../Composants/ProductCard";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Style from "./Accueil.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Accueil() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState(null);
  // Je recrée une liste filtrée pour ne pas interragir directement avec la liste de base et qu'on puisse y éventullement y revenir
  const [listToDisplay, setListToDisplay] = useState([]);
  const [loading, setLoading] = useState(false);

  // recuperer les catégories et produits au chargement de la page
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // je fais les fonctions séparément pour avoir une meilleure gestion  et une fonction assignée pour chaque fetch
  const fetchCategories = () => {
    axios.get("https://test-feed.airweb.workers.dev/categories").then((res) => {
      setCategories(res.data);
    });
  };
  const fetchProducts = () => {
    axios.get("https://test-feed.airweb.workers.dev/products").then((res) => {
      setProducts(res.data);
      setListToDisplay(res.data);
    });
  };

  // filtrer par catégorie
  const handleFilter = (catId) => {
    setLoading(true);
    const filteredList = products.filter(
      (product) => product.category_id === catId
    );

    setListToDisplay(filteredList);

    axios
      .get(`https://test-feed.airweb.workers.dev/categories/${catId}`)
      .then((res) => {
        setCategoryDescription(res.data);
      });
  };

  useEffect(() => {
    categoryDescription !== null && setLoading(false);
  }, [categoryDescription]);

  return (
    <div className={Style.container}>
      <h1>Accueil</h1>
      <div className={Style.Productcontainer}>
        <nav>
          {/* Possibilité de filtrer par catégorie */}
          {categories.map((categorie) => {
            return (
              <Button
                style={{
                  color: "#0b2752",
                  border: "2px solid #0b2752",
                  background: "#fff",
                  margin: "5px",
                }}
                onClick={() => {
                  handleFilter(categorie.id);
                }}
              >
                {categorie.label}
              </Button>
            );
          })}
          {/* vérifier si la liste est filtrée ou pas avant de proposer d'enlever le filtre */}
          {listToDisplay?.length !== products.length ? (
            <Button
              style={{ margin: "5px" }}
              variant="danger"
              onClick={() => {
                setListToDisplay(products);
                setCategoryDescription(null);
              }}
            >
              Enelever le filtre
            </Button>
          ) : null}
        </nav>
        {loading ? (
          <div className={Style.customLoader}></div>
        ) : categoryDescription !== null ? (
          <p>{categoryDescription.description}</p>
        ) : null}
        {/* la liste des produits filtrée ou non */}
        {listToDisplay.map((produit) => {
          return <ProductCard key={produit.id} produit={produit} />;
        })}
      </div>
    </div>
  );
}
