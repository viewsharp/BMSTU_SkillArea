import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Row
} from "reactstrap";
import markService from "../../services/mark";

class Marks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentWillMount() {
    this.setState({
      data: await markService.getUsersActivityMarksList(),
    });

    console.log(this.state);
  }

  render() {
    return (
        <div className="animated fadeIn">
          {this.state.data.map((item, i) =>
              <Row key={i}>
                <Col xs="12">
                  <Card>
                    <CardHeader>
                      <i className="fa fa-align-justify"></i> {item.discipline}
                    </CardHeader>
                    <CardBody>
                      <Table responsive bordered>
                        <thead>
                        <tr>
                          <th>Занятие</th>
                          <th>Дата</th>
                          <th>Оценка</th>
                        </tr>
                        </thead>
                        <tbody>
                        {item.activities.map((activity, j) =>
                            <tr key={j}>
                              <td>{activity.name}</td>
                              <td>{activity.date}</td>
                              <td>{activity.mark}</td>
                            </tr>
                        )}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          )}
        </div>
    );
  }
}

export default Marks;
