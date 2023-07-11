import React, { Component } from "react";
import Plantlist from "../../components/Plantlist";
import '../../App.css';

class Plants extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>Plants</h1>
        </div>
        <Plantlist />
      </div>
    );
  }
}

export default Plants;
