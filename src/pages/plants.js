import React, { Component } from "react";
import PlantlistsContainer from "../components/PlantlistsContainer";
import '../App.css';

class Plants extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>Plants</h1>
        </div>
        <PlantlistsContainer />
      </div>
    );
  }
}

export default Plants;