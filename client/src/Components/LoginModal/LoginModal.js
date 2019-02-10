import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
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
        new_password_saved: false,
        wrong_log: false,
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
        var lengt = this.state.new_pass;
        if((this.state.new_pass !== '') && (lengt.length >= 8)){
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
          } else {
              var forms = document.getElementsByClassName('signin_newpassword_valid');
              Array.prototype.filter.call(forms, function(form) {
                  form.classList.add('was-validated');
              });
          }
    }

    signIn() {
        if((this.state.log_login !== '') && (this.state.log_password !== '')){
            axios
              .post("/api/signin", {
                login: this.state.log_login,
                password: this.state.log_password
              })
              .then(res => {
                if (res.data.access_token) {
                    localStorage.setItem("access_token", res.data.access_token);
                    this.setState({
                      user_name: res.data.user_name,
                      wrong_log: false
                    });
                    if(res.data.need_pass){
                        this.setState({
                            new_pass_create: true
                        });
                    }
                    if(res.data.user_name === "admin"){
                        window.location.href = "/admin";
                    }
                } else {
                    this.setState({
                      wrong_log: true
                    });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
              var forms = document.getElementsByClassName('signin_form_valid');
              Array.prototype.filter.call(forms, function(form) {
                  form.classList.add('was-validated');
              });
          }
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
      let wrongpass;
      if(this.state.wrong_log){
          wrongpass = <div className="alert alert-danger mt-2" role="alert">
                                Wrong login or password!
                        </div>
        } else {
            wrongpass = "";
        };
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
                  <Form className="signin_newpassword_valid">

                      <FormGroup>
                        <Label for="newPassword">Input your password</Label>
                        <Input onChange={this.handleNewPassChange} type="password" name="newPassword" id="newPassword" placeholder="new password" minLength="8" required/>
                        <FormFeedback>Input your new password (lenght must be greater than 8 symbols)</FormFeedback>
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
                  <Form className="signin_form_valid">
                    <FormGroup>
                      <Label for="regLogin">Login (you are logged as <b>{username}</b>)</Label>
                      <Input onChange={this.handleLoginChange} autoFocus type="text" name="login" id="regLogin" placeholder="login" required/>
                      <FormFeedback>Input login</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="regPassword">Password</Label>
                      <Input onChange={this.handlePasswordChange} type="password" name="password" id="regPassword" placeholder="password" required/>
                      <FormFeedback>Input your password</FormFeedback>
                    </FormGroup>
                    <button
                      onClick={this.signIn.bind(this)}
                      className="btn btn-primary btn-block"
                      type="button"
                    >
                      {" "}
                       Sign In
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
                <Form className="signin_form_valid">
                  <FormGroup>
                    <Label for="regLogin">Login</Label>
                    <Input onChange={this.handleLoginChange} autoFocus type="text" name="login" id="regLogin" placeholder="login" required/>
                    <FormFeedback>Input login</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="regPassword">Password</Label>
                    <Input onChange={this.handlePasswordChange} type="password" name="password" id="regPassword" placeholder="password" required/>
                    <FormFeedback>Input your password</FormFeedback>
                  </FormGroup>
                  <button
                    onClick={this.signIn.bind(this)}
                    className="btn btn-primary btn-block"
                    type="button"
                  >
                    {" "}
                     Sign In
                  </button>
                  {wrongpass}
                </Form>



            </div>
        );
    }
   }
  }
}

export default LoginModal;
