import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Modal, ModalHeader, ModalBody} from 'reactstrap';
import LoginModal from "../LoginModal/LoginModal";
import AddCounterModal from "../AddCounterModal/AddCounterModal";
import axios from 'axios';
import './PersonalPageNav.css';


class PersonalPageNav extends Component {

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.toggleModalLogin = this.toggleModalLogin.bind(this);
      this.toggleModalCounter = this.toggleModalCounter.bind(this);
      this.state = {
        isOpen: false,
        modalLogin: false,
        username: null,
        modalCounter:false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    toggleModalLogin() {
      this.setState({
        modalLogin: !this.state.modalLogin
      });
    }
    toggleModalCounter() {
      this.setState({
        modalCounter: !this.state.modalCounter
      });
    }
    logout() {
        localStorage.removeItem("access_token");
        this.setState({
          username: null
        });
        window.location.href = "/";
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
      let username = this.state.username;
      let name;
      if (username) {
        name = username;
      } else {
        name = "Account";
      }

    return (
        <div>
         <Navbar color="dark" dark expand="md">
           <NavbarBrand href="/">Personal Page</NavbarBrand>
           <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink onClick={this.toggleModalCounter}>
                        <span className="add_counter_link">Add counter readings</span>
                     </NavLink>
                </NavItem>
               <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.toggleModalLogin}>
                    Login
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
         <Modal isOpen={this.state.modalLogin} toggle={this.toggleModalLogin} className={this.props.className}>
             <ModalHeader toggle={this.toggleModalLogin}>Login form</ModalHeader>
             <ModalBody>
               <LoginModal/>
             </ModalBody>
           </Modal>
           <Modal isOpen={this.state.modalCounter} toggle={this.toggleModalCounter} className={this.props.className}>
               <ModalHeader toggle={this.toggleModalCounter}>Add counter readings</ModalHeader>
               <ModalBody>
                 <AddCounterModal/>
               </ModalBody>
             </Modal>
       </div>
    );
  }
}

export default PersonalPageNav;
