import React, { Component } from 'react';
import { Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import "./LoginModal.css";

class LoginModal extends Component {
    constructor(props) {
      super(props);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleNewPassChange = this.handleNewPassChange.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = {
        log_login: "",
        log_password: "",
        user_name: "",
        new_pass: "",
        new_pass_create: false,
        new_password_saved: false
      };
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    handleLoginChange(e) {
        this.setState({ log_login: e.target.value });
    };

    handlePasswordChange(e) {
        this.setState({ log_password: e.target.value });
    };

    handleNewPassChange(e) {
        this.setState({ new_pass: e.target.value });
    };


    newPass(){
        axios.defaults.headers.common.authorization = localStorage.getItem(
          "access_token"
        );
        axios
          .post("/api/changepass", {
            new_password: this.state.new_pass
          })
          .then(res => {
            if(res.statusText === "OK"){
                this.setState({
                  new_password_saved: true
                });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
    }

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
                if(res.data.need_pass){
                    this.setState({
                        new_pass_create: true
                    });
                }
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
      if(this.state.new_pass_create){
          let new_pass_ok = this.state.new_password_saved;
          let new_pass_ok_show = "";
          if(new_pass_ok){
              new_pass_ok_show = <div className="alert alert-success mt-2" role="alert">
                                    New password saved!
                            </div>
          }
          return (
              <div>
                  <Form>

                      <FormGroup>
                        <Label for="newPassword">Input your password</Label>
                        <Input onChange={this.handleNewPassChange} type="password" name="newPassword" id="newPassword" placeholder="new password" />
                      </FormGroup>
                      <button
                        onClick={this.newPass.bind(this)}
                        className="btn btn-primary btn-block"
                        type="button"
                      >
                        {" "}
                         Save new password
                      </button>
                      {new_pass_ok_show}
                  </Form>
              </div>
          );
      } else {
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
                     <a href="/lk" className="personalPage_link">
                        <button
                          className="btn btn-primary btn-block mt-2"
                          type="button"
                        >
                          {" "}
                           To personal page
                        </button>
                    </a>
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
}

export default LoginModal;
