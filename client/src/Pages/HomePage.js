import React, { Component } from 'react';
import TopNav from "../Components/TopNav/TopNav";
import BackImage from "../Components/BackImage/BackImage";

class HomePage extends Component {

  render() {
    return (
      <div>
        <TopNav/>
        <BackImage/>
      </div>
    );
  }
}

export default HomePage;
