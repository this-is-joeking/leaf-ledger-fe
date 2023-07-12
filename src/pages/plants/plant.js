import React, { Component } from 'react';
import PlantDetails from '../../components/PlantDetails';
import '../../App.css';

class Plant extends Component {
  render() {
    return (
      <div className='mainContainer'>
        <PlantDetails />
        Back to <a href='/plants'>all plants</a>
      </div>
    );
  }
}

export default Plant;