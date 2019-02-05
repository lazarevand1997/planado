import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Modal, ModalHeader, ModalBody} from 'reactstrap';
import RegModal from "../RegModal/RegModal";
import axios from 'axios';


class TopNav extends Component {

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.toggleModalReg = this.toggleModalReg.bind(this);
      this.state = {
        isOpen: false,
        username: null,
        modalReg: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    toggleModalReg() {
      this.setState({
        modalReg: !this.state.modalReg
      });
    }
    logout() {
        localStorage.removeItem("access_token");
        this.setState({
          username: null
        });
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
            username: res.data.username
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
        <div>
         <Navbar color="dark" dark expand="md">
           <NavbarBrand href="/">Admin Panel</NavbarBrand>
           <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Admin
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.toggleModalReg}>
                    Register new user
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout.bind(this)}>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
             </Nav>
           </Collapse>
         </Navbar>

           <Modal isOpen={this.state.modalReg} toggle={this.toggleModalReg} className={this.props.className}>
               <ModalHeader toggle={this.toggleModalReg}>Register form</ModalHeader>
               <ModalBody>
                 <RegModal/>
               </ModalBody>
             </Modal>
       </div>
    );
  }
}

export default TopNav;
