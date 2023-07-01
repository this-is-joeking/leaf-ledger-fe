import React, { Component } from "react";
import axios from "axios";

class PlantlistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantlists: [],
    };
  }

  loadPlantlists() {
    axios.get("https://leaf-ledger-be.herokuapp.com/api/v1/plants")
      .then((res) => {
        this.setState({ plantlists: res.data.data });
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
            placeholder="Input a New Plant and Press Enter"
            maxLength="75"
            // onKeyPress={this.createPlant}
          />
        </div>
        <div className="wrapPlants">
          <ul className="listPlants">
            {this.state.plantlists.map((plantlist) => {
              return (
                <li className="plant" plantlist={plantlist} key={plantlist.id}>
                  <label className="itemDisplay">{plantlist.attributes.common_name}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default PlantlistsContainer;