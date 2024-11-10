import React, { useState } from "react";

const initialFormState = {
  name: "",
  image: "",
  price: "",
};

function NewPlantForm({ createPlant }) {
  const [formData, setFormData] = useState(initialFormState);

  // Handle changes to input fields
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, image, price } = formData;
    const parsedPrice = parseFloat(price);

    // Create a new plant object and reset the form
    if (name && image && !isNaN(parsedPrice)) {
      createPlant({ name, image, price: parsedPrice });
      setFormData(initialFormState);
    } else {
      alert("Please fill out all fields with valid data.");
    }
  };

  return (
    <section className="new-plant-form-container">
      <h2 className="form-heading">Add a New Plant</h2>
      <form onSubmit={handleFormSubmit} className="plant-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Plant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter plant name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Plant
        </button>
      </form>
    </section>
  );
}

export default NewPlantForm;
