import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from '@mui/material';

export default function Plantlist() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [totalPlants, setTotalPlants] = useState();
  const [allPlants, setAllPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  useEffect(() => {
    const getPlants = async () => {
      const url = `https://leaf-ledger-be.herokuapp.com/api/v1/plants?page=${currentPage}${searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ''}`;
      const dataFromServer = await axios.get(url);
      const plants = dataFromServer.data.data;
      const totalPlants = dataFromServer.headers['total'];
      const perPage = dataFromServer.headers['per-page'];
      setAllPlants(plants);
      setPerPage(perPage);
      setTotalPlants(totalPlants);
    };
    getPlants();
  }, [currentPage, searchTerm]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {
        totalPlants && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            { searchTerm && (
              <div>
                There are {totalPlants} plants in our AI Garden matching your search, feel free to grow some more by typing a new plant name in the box below
              </div>
            )}
            { !searchTerm && (
              <div>
                There are {totalPlants} plants in our AI Garden for you to browse or search.
              </div>
            )}
          </div>
        )
      }
      <div className="plantContainer">
        <input
          className="newPlant"
          type="text"
          placeholder="Search for a plant by common name"
          maxLength="75"
          value={searchTerm}
          onChange={handleInputChange}
          />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="wrapPlant">
          {allPlants.length === 0 && (
            <div className="no-results">
              <p>Sorry, there are no plants that match <em>{searchTerm}</em></p>
              <p>Click <a href={`/plants/new?name=${searchTerm}`}>here</a> to request the plant be grown. (It takes AI about 12 seconds to grow a new plant)</p>
            </div>
          )}
          {allPlants.length !==0 && (
            <table className="listPlants plant-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>AI Image</th>
                  <th>Common Name</th>
                  <th>Scientific Name</th>
                </tr>
              </thead>
              <tbody>
                {allPlants.map((plant) => {
                  return (
                    <tr key={plant.id}>
                      <td className="plantImage"><img src={plant.attributes.plant_img_url} width='100%' alt="ai generated rendering plant"></img></td>
                      <td className="plant" key={plant.id}>
                        <a href={'/plants/' + plant.id}>{plant.attributes.common_name}</a>
                      </td>
                      <td>{plant.attributes.scientific_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {totalPlants && perPage && (allPlants.length !== 0) && (
            <Pagination count={ Math.ceil(totalPlants / perPage) } page={currentPage} onChange={handleChange} />
          )}
        </div>
      </div>
    </div>
  );
}

