import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class RegModal extends Component {
    constructor(props) {
      super(props);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        reg_login: "",
        reg_password: ""
      };
    }

    handleLoginChange(e) {
        this.setState({ reg_login: e.target.value });
    };

    handlePasswordChange(e) {
        this.setState({ reg_password: e.target.value });
    };

    signUp() {
        axios
          .post("/api/signup", {
            login: this.state.reg_login,
            password: this.state.reg_password
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
              <Label for="regPassword">Password</Label>
              <Input onChange={this.handlePasswordChange} type="password" name="password" id="regPassword" placeholder="password" />
            </FormGroup>
            <button
              onClick={this.signUp.bind(this)}
              className="btn btn-primary btn-block"
              type="button"
            >
              {" "}
               SignUp
            </button>
          </Form>
      </div>
    );
  }
}

export default RegModal;
