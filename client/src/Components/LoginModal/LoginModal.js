import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class LoginModal extends Component {
    constructor(props) {
      super(props);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        log_login: "",
        log_password: ""
      };
    }

    handleLoginChange(e) {
        this.setState({ log_login: e.target.value });
    };

    handlePasswordChange(e) {
        this.setState({ log_password: e.target.value });
    };

    signIn() {
        axios
          .post("/api/signin", {
            login: this.state.log_login,
            password: this.state.log_password
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
                onClick={this.signIn.bind(this)}
                className="btn btn-primary btn-block"
                type="button"
              >
                {" "}
                 SignIn
              </button>
            </Form>
        </div>
    );
  }
}

export default LoginModal;
