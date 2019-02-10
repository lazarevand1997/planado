import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
class AddCounterModal extends Component {

    constructor(props) {
      super(props);
      this.handleYearChange = this.handleYearChange.bind(this);
      this.handleMonthChange = this.handleMonthChange.bind(this);
      this.handleColdChange = this.handleColdChange.bind(this);
      this.handleHotChange = this.handleHotChange.bind(this);
      this.state = {
        year: "",
        month:"",
        cold: "",
        hot: "",
        nice_add:false
      };
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    };
    handleMonthChange(e) {
        this.setState({ month: e.target.value });
    };
    handleColdChange(e) {
        this.setState({ cold: e.target.value });
    };
    handleHotChange(e) {
        this.setState({ hot: e.target.value });
    };

    sendCounter() {
        if((this.state.year !== '') && (this.state.month !== '')
        && (this.state.cold !== '') && (this.state.hot !== '')){
            axios.defaults.headers.common.authorization = localStorage.getItem(
              "access_token"
            );
            axios
              .post("/api/createcounter", {
                  year: this.state.year,
                  month: this.state.month,
                  cold: this.state.cold,
                  hot: this.state.hot
              })
              .then(res => {
                if(res.data.status === "success"){
                    this.setState({ nice_add: true });
                } else {
                    this.setState({ nice_add: false });
                }
              })
              .catch(err => console.log(err));
          } else {
              var forms = document.getElementsByClassName('counter_form_valid');
              Array.prototype.filter.call(forms, function(form) {
                  form.classList.add('was-validated');
              });
          }
  }


  render() {
      var dt = new Date();
      var now_month = dt.getMonth() + 1;
      let allok;
      if(this.state.nice_add){
          allok = <div className="alert alert-success mt-2" role="alert">
                                Success!
                        </div>
      } else {
          allok = "";
      }
    return (
      <div>
        <Form className="counter_form_valid">
            <Row form>
                <Col md={6}>
                    <FormGroup>
                       <Label for="counterYear">Year</Label>
                       <Input onChange={this.handleYearChange} defaultValue={dt.getFullYear()} max={dt.getFullYear()} type="number" name="counterYear" id="counterYear" placeholder="year" required/>
                     </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                       <Label for="counterMonth">Month</Label>
                       <Input onChange={this.handleMonthChange} defaultValue={now_month} min="1" max="12" type="number" name="counterMonth" id="counterMonth" placeholder="month" required/>
                     </FormGroup>
                </Col>
            </Row>
            <FormGroup>
               <Label for="counterCold">Cold water</Label>
               <Input onChange={this.handleColdChange} type="number" name="counterCold" id="counterCold" placeholder="liters" required/>
             </FormGroup>
             <FormGroup>
                <Label for="counterHot">Hot water</Label>
                <Input onChange={this.handleHotChange} type="number" name="counterHot" id="counterHot" placeholder="liters" required/>
              </FormGroup>
              <button
                onClick={this.sendCounter.bind(this)}
                className="btn btn-primary btn-block"
                type="button"
              >
                {" "}
                 Send
              </button>
              {allok}
        </Form>
      </div>
    );
  }
}

export default AddCounterModal;
