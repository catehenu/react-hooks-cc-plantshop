import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, deletePlant, updatePlant }) {
  const renderPlantCards = () => {
    // Map through the plants array and return PlantCard components
    return plants.map((plant) => {
      const { id, name, price, image } = plant;

      return (
        <PlantCard
          key={id}
          id={id}
          name={name}
          price={price}
          image={image}
          deletePlant={deletePlant}
          updatePlant={updatePlant}
        />
      );
    });
  };

  return (
    <section className="plant-list-section">
      <h2 className="section-title">Plant Collection</h2>
      <ul className="cards">{renderPlantCards()}</ul>
    </section>
  );
}

export default PlantList;
