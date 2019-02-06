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
  }


  render() {
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
        <Form>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                       <Label for="counterYear">Year</Label>
                       <Input onChange={this.handleYearChange} type="number" name="counterYear" id="counterYear" placeholder="year" />
                     </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                       <Label for="counterMonth">Month</Label>
                       <Input onChange={this.handleMonthChange} type="number" name="counterMonth" id="counterMonth" placeholder="month" />
                     </FormGroup>
                </Col>
            </Row>
            <FormGroup>
               <Label for="counterCold">Cold water</Label>
               <Input onChange={this.handleColdChange} type="text" name="counterCold" id="counterCold" placeholder="liters" />
             </FormGroup>
             <FormGroup>
                <Label for="counterHot">Hot water</Label>
                <Input onChange={this.handleHotChange} type="text" name="counterHot" id="counterHot" placeholder="liters" />
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
