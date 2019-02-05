import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import './WaterUserTable.css';

class WaterUserTable extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

    componentDidMount() {
        axios.defaults.headers.common.authorization = localStorage.getItem(
          "access_token"
        );
        axios
          .get("/api/usercouner")
          .then(res => {
            if (res) {
                var dataCounter = res.data;
                this.setState({
                        data: dataCounter
                    });
            }
          })
          .catch(err => console.log(err));
      }

  render() {

      const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

      const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
            )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

      document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
            const table = th.closest('table');
            Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
                .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                .forEach(tr => table.appendChild(tr) );
        })));

    return (
      <div>
      <Table>
          <tbody>
              <tr className="user_counter_table_head">
                <th>Year</th>
                <th>Month</th>
                <th>Cold water</th>
                <th>Hot water</th>
              </tr>
            {this.state.data.map(function(item, key) {
               var hope = JSON.parse(item);
               return (
                  <tr key = {key}>
                      <td>{hope.year}</td>
                      <td>{hope.month}</td>
                      <td>{hope.coldwater}</td>
                      <td>{hope.hotwater}</td>
                  </tr>
                )

             })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default WaterUserTable;
