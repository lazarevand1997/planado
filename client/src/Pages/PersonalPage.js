import React, { Component } from 'react';
import PersonalPageNav from "../Components/PersonalPageNav/PersonalPageNav";
import WaterUserTable from "../Components/WaterUserTable/WaterUserTable";

class PersonalPage extends Component {

  render() {
    return (
      <div>
        <PersonalPageNav/>
        <WaterUserTable/>
      </div>
    );
  }
}

export default PersonalPage;
