import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from '@mui/material';

export default function Plantlist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [totalPlants, setTotalPlants] = useState();
  const [allPlants, setAllPlants] = useState([]);


  useEffect(() => {
    const getPlants = async () => {
      const dataFromServer = await axios.get(
        `https://leaf-ledger-be.herokuapp.com/api/v1/plants?page=${currentPage}`
      );
      const plants = dataFromServer.data.data;
      const totalPlants = dataFromServer.headers['total'];
      const perPage = dataFromServer.headers['per-page'];
      setAllPlants(plants);
      setPerPage(perPage);
      setTotalPlants(totalPlants);
    };
    getPlants();
  }, [currentPage]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>

        There are {totalPlants} plants in our system currently, but we are working on ways to grow this quickly
      </div>
      <div className="plantContainer">
        <input
          className="newPlant"
          type="text"
          placeholder="Search for a plant by common name"
          maxLength="75"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="wrapPlant">
          <table className="listPlants plant-table" style={{ width: '100%' }}>
            {allPlants.map((plant) => {
              return (
                <tr>
                <td className="plant" plant={plant} key={plant.id}>
                  <a href={'/plants/' + plant.id}>{plant.attributes.common_name}</a>
                </td>

                </tr>
              );
            })}
          </table>
          <Pagination count={ Math.ceil(totalPlants / perPage) } page={currentPage} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

