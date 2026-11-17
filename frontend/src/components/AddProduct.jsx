
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage || null);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (
      !product.name.trim() ||
      !product.brand.trim() ||
      !product.description.trim() ||
      product.price === "" ||
      !product.category ||
      product.stockQuantity === "" ||
      !product.releaseDate
    ) {
      alert("Please fill in all product details.");
      return;
    }

    if (!image) {
      alert("Please select a product image.");
      return;
    }

    if (product.price < 0 || product.stockQuantity < 0) {
      alert("Price and stock quantity cannot be negative.");
      return;
    }

    const formData = new FormData();

    formData.append("imageFile", image);

    const productData = {
      ...product,
      price: Number(product.price),
      stockQuantity: Number(product.stockQuantity),
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], {
        type: "application/json",
      })
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/api/product",
        formData
      );

      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");

      // Reset form after successful submission
      setProduct({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: false,
      });

      setImage(null);

      event.target.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      console.log("Backend response:", error.response?.data);
      console.log("Status code:", error.response?.status);

      alert(
        error.response?.data
          ? `Failed to add product: ${typeof error.response.data === "string"
              ? error.response.data
              : JSON.stringify(error.response.data)}`
          : "Unable to connect to the backend."
      );
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: 1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
              min="0"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
              required
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
              min="0"
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Product Available
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
