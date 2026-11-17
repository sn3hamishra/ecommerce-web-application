
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    refreshData();
  }, []);

  // Fetch product images
  useEffect(() => {
    let cancelled = false;
    let imageUrls = [];

    const fetchImages = async () => {
      setIsLoading(true);

      if (!data || data.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );

              const imageUrl = URL.createObjectURL(response.data);
              imageUrls.push(imageUrl);

              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );

              return { ...product, imageUrl: unplugged };
            }
          })
        );

        if (!cancelled) {
          setProducts(updatedProducts);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading products:", error);

        if (!cancelled) {
          setProducts([]);
          setIsLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      cancelled = true;
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category === selectedCategory
      )
    : products;

  if (isError) {
    return (
      <div className="text-center" style={{ padding: "100px" }}>
        <img
          src={unplugged}
          alt="Connection Error"
          style={{ width: "100px", height: "100px" }}
        />
        <h3>Unable to connect to server</h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <h2 className="text-center" style={{ padding: "100px" }}>
        Loading Products...
      </h2>
    );
  }

  return (
    <div
      className="grid"
      style={{
        marginTop: "64px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {filteredProducts.length === 0 ? (
        <h2 className="text-center">No Products Available</h2>
      ) : (
        filteredProducts.map((product) => {
          const {
            id,
            brand,
            name,
            price,
            productAvailable,
            imageUrl,
          } = product;

          return (
            <div
              className="card mb-3"
              style={{
                width: "250px",
                height: "360px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: productAvailable ? "#fff" : "#ccc",
                display: "flex",
                flexDirection: "column",
              }}
              key={id}
            >
              <Link
                to={`/product/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={imageUrl || unplugged}
                  alt={name || "Product"}
                  onError={(e) => {
                    e.currentTarget.src = unplugged;
                  }}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                />

                <div
                  className="card-body"
                  style={{
                    padding: "10px",
                  }}
                >
                  <h5
                    className="card-title"
                    style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
                  >
                    {(name || "Unnamed Product").toUpperCase()}
                  </h5>

                  <i
                    className="card-brand"
                    style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                  >
                    {"~ " + (brand || "")}
                  </i>

                  <hr style={{ margin: "10px 0" }} />

                  <h5
                    className="card-text"
                    style={{
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      marginBottom: "5px",
                    }}
                  >
                    <i className="bi bi-currency-rupee"></i>
                    {price}
                  </h5>
                </div>
              </Link>

              <button
                className="btn-hover color-9"
                style={{ margin: "10px 25px 0" }}
                onClick={() => addToCart(product)}
                disabled={!productAvailable}
              >
                {productAvailable ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;

