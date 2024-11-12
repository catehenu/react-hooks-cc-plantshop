import React, { useEffect, useState } from "react";

import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch plants from the server on initial load
  useEffect(() => {
    const getPlants = async () => {
      try {
        const response = await fetch("https://react-hooks-cc-plantshop-vtoo.onrender.com/plants");
        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    getPlants();
  }, []);

  // Handle adding a new plant
  const createPlant = (newPlant) => {
    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    };

    fetch("https://react-hooks-cc-plantshop-vtoo.onrender.com/plants", configObject)
      .then((response) => response.json())
      .then((data) => setPlants((prevPlants) => [...prevPlants, data]));
  };

  // Handle deleting a plant
  const deletePlant = (plantId) => {
    alert(`You're deleting plant ${plantId}`);
    fetch(`https://react-hooks-cc-plantshop-vtoo.onrender.com/plants/${plantId}`, { method: "DELETE" })
      .then(() => {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
      })
      .catch((error) => {
        console.error("Error deleting plant:", error);
      });
  };

  // Handle updating plant price
  const updatePlant = (plantId, updatedPriceObject) => {
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPriceObject),
    };

    fetch(`https://react-hooks-cc-plantshop-vtoo.onrender.com/plants/${plantId}`, configObject)
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) => (plant.id === updatedPlant.id ? updatedPlant : plant))
        );
        alert("Your price has been updated!");
      })
      .catch((error) => {
        console.error("Error updating plant price:", error);
      });
  };

  // Filter plants based on search input
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm createPlant={createPlant} />
      <Search search={search} setSearch={setSearch} />
      <PlantList
        plants={filteredPlants}
        deletePlant={deletePlant}
        updatePlant={updatePlant}
      />
    </main>
  );
}

export default PlantPage;
console.log