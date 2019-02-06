import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './AdminUsersList.css';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import $ from 'jquery';

class AdminUsersList extends Component {

    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        data: [],
        modal_user_id:"",
        firstname:"",
        lastname:'',
        address:"",
        modal: false,
      };
    }

    toggle(e) {
       let element = $(e.currentTarget);
       let id_modal = $(element).data('id');
       let firstname_modal = $(element).data('firstname');
       let lastname_modal = $(element).data('lastname');
       let address_modal = $(element).data('address');
       this.setState(prevState => ({
         modal_user_id: id_modal,
         firstname: firstname_modal,
         lastname: lastname_modal,
         address: address_modal,
         modal: !prevState.modal
       }));
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

              {this.state.data.map((item, key) => {
                 var hope = JSON.parse(item);
                 if(hope.is_admin !== true){
                 return (
                    <tr key = {key} data-id={hope.id} data-firstname={hope.first_name} data-lastname={hope.second_name} data-address={hope.address} onClick={this.toggle}>
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
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
             <ModalHeader toggle={this.toggle}>User info</ModalHeader>
             <ModalBody>
              <UserInfoModal userid={this.state.modal_user_id} firstname={this.state.firstname} lastname={this.state.lastname} address={this.state.address}/>
             </ModalBody>
             <ModalFooter>
               <Button color="secondary" onClick={this.toggle}>Cancel</Button>
             </ModalFooter>
           </Modal>
        </div>
    );
  }
}

export default AdminUsersList;
