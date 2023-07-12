import React, { Component } from 'react';
import CreatePlant from '../../components/CreatePlant'
import '../../App.css';

class NewPlant extends Component {
  render() {
    return (
      <div className='mainContainer'>
        <CreatePlant />
      </div>
    )
  }
}

export default NewPlant;