import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

class ModalTopUsers extends Component {

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
          .post("/api/topusers", {
              watertype: this.props.type,
          })
          .then(res => {
            if (res) {
                var datatop = res.data;
                function compareAge(userA, userB) {
                  return userB.watercount - userA.watercount;
                };
                datatop.sort(compareAge);
                this.setState({
                        data: datatop
                    });
            }
          })
          .catch(err => console.log(err));
      }

  render() {
    return (
      <div>
        <h3>Users top if {this.props.type} water</h3>
        <Table>
            <tbody>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Water count</th>
                </tr>
              {this.state.data.map(function(item, key) {
                  if(key <= 3){
                     return (
                        <tr key = {key}>
                            <td>{item.userinfo.id}</td>
                            <td>{item.userinfo.user_name}</td>
                            <td>{item.watercount}</td>
                        </tr>
                      )
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

export default ModalTopUsers;
