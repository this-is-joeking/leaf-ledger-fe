import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import LoadingPlant from "./LoadingPlant"
import axios from "axios";
import '../App.css';

export default function CreatePlant() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const plantName = searchParams.get("name");
  const [plantId, setPlantId] = useState();

  useEffect(() => {
    const createPlant = async () => {
      const url = `https://leaf-ledger-be.herokuapp.com/api/v1/plants?name=${plantName}`;
      const dataFromServer = await axios.post(url);
      const newPlantId = dataFromServer.data.data.id;
      setPlantId(newPlantId);
    };
    createPlant();
  }, [plantName]);

  useEffect(() => {
    if (plantId) {
      window.location.href = `/plants/${plantId}`;
    }
  }, [plantId])

    return (
      <div className="mainContainter">
        <div className="topHeading">
          <h1>Growing {plantName}...</h1>
        </div>
        <div className="loading">
          <LoadingPlant />
        </div>
      </div>
    )
}
