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
        const response = await fetch("http://localhost:6001/plants");
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

    fetch("http://localhost:6001/plants", configObject)
      .then((response) => response.json())
      .then((data) => setPlants((prevPlants) => [...prevPlants, data]));
  };

  // Handle deleting a plant
  const deletePlant = (plantId) => {
    alert(`You're deleting plant ${plantId}`);
    fetch(`http://localhost:6001/plants/${plantId}`, { method: "DELETE" })
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

    fetch(`http://localhost:6001/plants/${plantId}`, configObject)
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
