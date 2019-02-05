import React, { Component } from 'react';
import AdminNav from "../Components/AdminNav/AdminNav";
import axios from 'axios';
import LoginModal from '../Components/LoginModal/LoginModal';

class AdminPage extends Component {

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
       if (isadmin && (username === "admin")){
           return (
               <div>
                 <AdminNav/>
               </div>
           );
       } else {
        return (
          <div className="container col-10 col-sm-10 col-md-6 col-lg-4 mt-4">
            <h5 className="mb-3">You need to login as administrator</h5>
            <LoginModal/>
          </div>
        );
    }
  }
}

export default AdminPage;
