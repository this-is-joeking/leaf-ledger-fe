import React from 'react';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingPlant from './LoadingPlant'
import axios from 'axios';
import '../App.css';

export default function CreatePlant() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const plantName = searchParams.get('name');
  const unprocessableEntity = 422;
  const [plantId, setPlantId] = useState();
  const [error, setError] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (!requestSent) {
      const createPlant = async () => {
        try {
          const url = `https://leaf-ledger-be.herokuapp.com/api/v1/plants?name=${plantName}`;
          const dataFromServer = await axios.post(url);
          const newPlantId = dataFromServer.data.data.id;
          setPlantId(newPlantId);
        } catch (error) {
          if (
            error.response &&
            error.response.status === unprocessableEntity
          ) {
            setError(
              `${plantName} does not seem like a plant name, maybe try checking your spelling or use the scientific name`
            );
          } else {
            setError('An error occurred. Please try again later.');
          }
        }
        setRequestSent(true);
      };
      createPlant();
    }
  }, [plantName, requestSent]);

  useEffect(() => {
    if (plantId) {
      window.location.href = `/plants/${plantId}`;
    }
  }, [plantId])

    if (error) {
      return (
        <div className='mainContainer'>
        <div className='topHeading'>
          <h1>Error</h1>
        </div>
        <div className='error'>{error}</div>
        Back to <a href='/plants'>all plants</a>
      </div>
      );
    }
    return (
      <div className='mainContainter'>
        <div className='topHeading'>
          <h1>Growing {plantName}...</h1>
        </div>
        <div className='loading'>
            <LoadingPlant />
        </div>
      </div>
    )
}
