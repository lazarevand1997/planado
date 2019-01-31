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
import RegModal from "../RegModal/RegModal";


class TopNav extends Component {

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.toggleModalLogin = this.toggleModalLogin.bind(this);
      this.toggleModalReg = this.toggleModalReg.bind(this);
      this.state = {
        isOpen: false,
        modalLogin: false,
        modalReg: false
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
    toggleModalReg() {
      this.setState({
        modalReg: !this.state.modalReg
      });
    }

  render() {
    return (
        <div>
         <Navbar color="dark" dark expand="md">
           <NavbarBrand href="/">ColdWarmProject</NavbarBrand>
           <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               <NavItem>
                 <NavLink href="/">About</NavLink>
               </NavItem>
               <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.toggleModalLogin}>
                    Login
                  </DropdownItem>
                  <DropdownItem onClick={this.toggleModalReg}>
                    Register
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
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
