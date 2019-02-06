import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './AdminUsersList.css';

class AdminUsersList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

    componentDidMount() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
          "access_token"
        );
        axios
          .get("/api/read")
          .then(res => {
            if (res) {
                var dataCounter = res.data;
                console.log(dataCounter);
                this.setState({
                        data: dataCounter
                    });
            }
          })
          .catch(err => console.log(err));
      }

  render() {
    return (
        <div>
        <Table hover>
        <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody className="userslist_body">

              {this.state.data.map(function(item, key) {
                 var hope = JSON.parse(item);
                 if(hope.is_admin !== true){
                 return (
                    <tr key = {key}>
                        <td>{hope.id}</td>
                        <td>{hope.user_name}</td>
                        <td>{hope.address}</td>
                    </tr>
                );
              } else {
                  return false;
              }
               })}
            </tbody>
          </Table>
        </div>
    );
  }
}

export default AdminUsersList;
