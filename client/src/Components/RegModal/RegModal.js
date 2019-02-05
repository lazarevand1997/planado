import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class RegModal extends Component {
    constructor(props) {
      super(props);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.state = {
        reg_login: "",
        reg_firstname: "",
        reg_lastname: "",
        reg_address: ""
      };
    }

    handleLoginChange(e) {
        this.setState({ reg_login: e.target.value });
    };

    handleFirstNameChange(e) {
        this.setState({ reg_firstname: e.target.value });
    };

    handleLastNameChange(e) {
        this.setState({ reg_lastname: e.target.value });
    };

    handleAddressChange(e) {
        this.setState({ reg_address: e.target.value });
    };

    signUp() {
        axios
          .post("/api/signup", {
            login: this.state.reg_login,
            firstname: this.state.reg_firstname,
            lastname: this.state.reg_lastname,
            address: this.state.reg_address
          })
          .then(res => {
            console.log(res);
          })
          .catch(function(error) {
            console.log(error);
          });
    };


  render() {
    return (
      <div>
          <Form>
            <FormGroup>
              <Label for="regLogin">Login</Label>
              <Input onChange={this.handleLoginChange} autoFocus type="text" name="login" id="regLogin" placeholder="login" />
            </FormGroup>
            <FormGroup>
              <Label for="regFirstName">First name</Label>
              <Input onChange={this.handleFirstNameChange} type="text" name="regFirstName" id="regFirstName" placeholder="First name" />
            </FormGroup>
            <FormGroup>
              <Label for="regLastName">Last name</Label>
              <Input onChange={this.handleLastNameChange} type="text" name="regLastName" id="regLastName" placeholder="Last name" />
            </FormGroup>
            <FormGroup>
              <Label for="regAddress">Address</Label>
              <Input onChange={this.handleAddressChange} type="textarea" name="regAddress" id="regAddress" placeholder="address" />
            </FormGroup>
            <button
              onClick={this.signUp.bind(this)}
              className="btn btn-primary btn-block"
              type="button"
            >
              {" "}
               Register
            </button>
          </Form>
      </div>
    );
  }
}

export default RegModal;
