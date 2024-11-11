import React, {  useState } from "react";

function PlantCard({ id, name, image, price, deletePlant, updatePlant }) {
  const [inStock, setInStock] = useState(true);
  const [priceInput, setPriceInput] = useState(price);

// Handler to mark the plant as out of stock
  const markOutOfStock = () => setInStock(false);

  // Handler to delete the plant
  const handleDeleteClick = () => deletePlant(id);

  // Handler for form submission to update the price
  const handlePriceSubmit = (event) => {
    event.preventDefault();
    const updatedPrice = parseFloat(priceInput);
    if (!isNaN(updatedPrice)) {
      updatePlant(id, { price: updatedPrice });
    } else {
      alert("Please enter a valid price.");
    }
  };

  return (
    <li >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
        <div className="plant-card">
      <img className="plant-image" src={image} alt={name} />
      <div className="plant-info">
        <h4 className="plant-name">{name}</h4>
        <div className="plant-price">
          <span>Price:</span>
          <form onSubmit={handlePriceSubmit}>
            <input
              type="text"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="price-input"
              name="price"
            />
            <button type="submit" className="update-price-btn">Update Price</button>
          </form>
        </div>
      </div>
      <div className="plant-actions">
        <div className="stock-status">
          {inStock ? (
            <button onClick={markOutOfStock} className="in-stock-btn">
              In Stock
            </button>
          ) : (
            <button className="out-of-stock-btn">Out of Stock</button>
          )}
        </div>
        <button onClick={handleDeleteClick} className="delete-btn">x</button>
      </div>
      </div>
        </div>
      </div>
    </div>
    </li>
  );
}

export default PlantCard;
