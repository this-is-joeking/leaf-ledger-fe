import React, { Component } from "react";
import axios from "axios";

class PlantlistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantlists: []
    };
  }

  loadPlantlists() {
    axios.get("https://leaf-ledger-be.herokuapp.com/api/v1/plants")
      .then((res) => { 
        this.setState({ plantlists: res.data.data, linkHeaders: res.headers['link'], totalPlants: res.headers['total'] });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadPlantlists();
  }

  render() {
    return (
      <div>
        <div className="plantContainer">
          <input
            className="newPlant"
            type="text"
            placeholder="Search for a plant by common name"
            maxLength="75"
            // onKeyPress={this.createPlant}
          />
        </div>
        There are {this.state.totalPlants} plants in our system currently, but we are working on ways to grow this quickly
        <div className="wrapPlant">
          <ul className="listPlants">
            {this.state.plantlists.map((plantlist) => {
              return (
                <li className="plant" plantlist={plantlist} key={plantlist.id}>
                  <label className="itemDisplay">{plantlist.attributes.common_name}</label>
                </li>
              );
            })}
          </ul>
          There are {Math.ceil(this.state.totalPlants / 25)} pages of plants
        </div>
      </div>
    );
  }
}

export default PlantlistsContainer;