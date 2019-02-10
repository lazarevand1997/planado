import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
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
        reg_address: "",
        sended: false
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
        if((this.state.reg_login !== '') && (this.state.reg_firstname !== '')
        && (this.state.reg_lastname !== '') && (this.state.reg_address !== '')){
            axios
              .post("/api/signup", {
                login: this.state.reg_login,
                firstname: this.state.reg_firstname,
                lastname: this.state.reg_lastname,
                address: this.state.reg_address
              })
              .then(res => {
                if(res.data.command === "INSERT"){
                    this.setState({ sended: true});
                } else {
                    this.setState({ sended: false });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
                var forms = document.getElementsByClassName('reg_form_valid');
                Array.prototype.filter.call(forms, function(form) {
                    form.classList.add('was-validated');
                });
          }
    };


  render() {
      let allok;
      if(this.state.sended){
          allok = <div className="alert alert-success mt-2" role="alert">
                                Success!
                        </div>
      } else {
          allok = "";
      }
    return (
      <div>
          <Form className="reg_form_valid">
            <FormGroup>
              <Label for="regLogin">Login</Label>
              <Input onChange={this.handleLoginChange} autoFocus type="text" name="login" id="regLogin" placeholder="login" required/>
              <FormFeedback>Input login</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="regFirstName">First name</Label>
              <Input onChange={this.handleFirstNameChange} type="text" name="regFirstName" id="regFirstName" placeholder="First name" required/>
              <FormFeedback>Input client's first name</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="regLastName">Last name</Label>
              <Input onChange={this.handleLastNameChange} type="text" name="regLastName" id="regLastName" placeholder="Last name" required/>
              <FormFeedback>Input client's last name</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="regAddress">Address</Label>
              <Input onChange={this.handleAddressChange} type="textarea" name="regAddress" id="regAddress" placeholder="address" required/>
              <FormFeedback>Input client's address</FormFeedback>
            </FormGroup>
            <button
              onClick={this.signUp.bind(this)}
              className="btn btn-primary btn-block"
              type="button"
            >
              {" "}
               Register
            </button>
            {allok}
          </Form>
      </div>
    );
  }
}

export default RegModal;
