import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row
} from "reactstrap";

class Marks extends Component {
  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Bordered Table
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                    <tr>
                      <th>Username</th>
                      <th>Math</th>
                      <th>Physics</th>
                      <th>Software engineering</th>
                      <th>Develop</th>
                      <th><strong>Total</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>user</td>
                      <td>40</td>
                      <td>41</td>
                      <td>42</td>
                      <td>43</td>
                      <td><Badge color="success">166</Badge></td>
                    </tr>
                    <tr>
                      <td>test</td>
                      <td>30</td>
                      <td>31</td>
                      <td>32</td>
                      <td>33</td>
                      <td><Badge color="warning">126</Badge></td>
                    </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Marks;
