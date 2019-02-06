import React, { Component } from 'react';
import PersonalPageNav from "../Components/PersonalPageNav/PersonalPageNav";
import WaterUserTable from "../Components/WaterUserTable/WaterUserTable";
import axios from 'axios';
import LoginModal from '../Components/LoginModal/LoginModal';

class PersonalPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        username: null,
        isadmin:false
      };
    }

    componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .get("/api/check")
      .then(res => {
        if (res.data.username) {
          this.setState({
            username: res.data.username,
            isadmin: res.data.isadmin
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
      let username = this.state.username;
      let isadmin = this.state.isadmin;
      if(username && !isadmin){
            return (
              <div>
                <PersonalPageNav/>
                <WaterUserTable/>
              </div>
            );
        } else if((username === "admin") && isadmin){
            window.location.href = "/admin";
        } else {
            return (
              <div className="container col-10 col-sm-10 col-md-6 col-lg-4 mt-4">
                <h5 className="mb-3">You need to sign in</h5>
                <LoginModal/>
              </div>
            );
        }
  }
}

export default PersonalPage;
