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
        log_password: "",
        user_name: ""
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
            if (res.data.access_token) {
                localStorage.setItem("access_token", res.data.access_token);
                this.setState({
                  user_name: res.data.user_name
                });
              }
          })
          .catch(function(error) {
            console.log(error);
          });
    };

    componentDidMount() {
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "access_token"
    );
    axios
      .get("/api/check")
      .then(res => {
        if (res.data.username) {
          this.setState({
            user_name: res.data.username
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
      let username = this.state.user_name;
      if (username) {
          return (
              <div>
                  <Form>
                    <FormGroup>
                      <Label for="regLogin">Login (you are logged as <b>{username}</b>)</Label>
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
                    <button
                      className="btn btn-primary btn-block"
                      type="button"
                    >
                      {" "}
                       To personal page
                    </button>
                  </Form>
              </div>
          );
      } else {
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
}

export default LoginModal;
