import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import axios from "axios";
import '../App.css';

export default function PlantDetails() {
  const [plant, setPlant] = useState({});
  const location = useLocation();
  const path = location.pathname;
  const plantId = path.split('/').pop();
  const titleCase = (s) =>
  s.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
   .replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) // First char after each -/_

  useEffect(() => {
    const getPlant = async () => {
      const response = await axios.get(
        `https://leaf-ledger-be.herokuapp.com/api/v1/plants/${plantId}`
      );
      const plantData = response.data;
      const plantAttributes = plantData.data.attributes
      setPlant(plantAttributes);
    };
    getPlant();
  }, [plantId]);

  return (
    <div>
      <div className="topHeading">
        <h1>{plant.common_name}</h1>
        <img src={plant.plant_img_url} width="20%" alt="ai generated image of plant"></img>
      </div>
      <table className="plant-table">
        <tbody>
          {Object.entries(plant).map(([key, value]) => (
              key !== "plant_img_url" && (
                <tr key={key}>
                  <td>{titleCase(key)}</td>
                  <td>{value}</td>
                </tr>
              )
            ))}
        </tbody>
      </table>
    </div>
  );
}