import React, { Component } from 'react';
import "./BackImage.css";

class BackImage extends Component {

  render() {
    return (
      <div className="main_background_image">
        <div className="main_background_image__content">
            <div className="main_background_image__content_block">
                <img className="main_valve" src={require("./valve_c.png")} alt="valve"/>
                <p className="main_textabout">ColdHotProject</p>
            </div>
        </div>
      </div>
    );
  }
}

export default BackImage;
