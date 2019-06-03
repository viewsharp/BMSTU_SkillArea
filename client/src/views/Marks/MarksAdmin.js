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
import {Link} from 'react-router-dom';

class Marks extends Component {
  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i><Link to='groups/2'>iu5-83</Link>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                    <tr>
                      <th>Название</th>
                      <th>Математика</th>
                      <th>Физика</th>
                      <th>Философия</th>
                      <th>Социология</th>
                      <th>Информатика</th>
                      <th>Фронтенд</th>
                      <th><strong>Сумма</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Иванов Иван</td>
                      <td>10</td>
                      <td>5</td>
                      <td>0</td>
                      <td>0</td>
                      <td>10</td>
                      <td>5</td>
                      <td><Badge color="warning">30</Badge></td>
                    </tr>
                    <tr>
                      <td>Атаманов Владимир</td>
                      <td>10</td>
                      <td>5</td>
                      <td>10</td>
                      <td>5</td>
                      <td>10</td>
                      <td>5</td>
                      <td><Badge color="success">45</Badge></td>
                    </tr>
                    <tr>
                      <td>Павел Павлов</td>
                      <td>0</td>
                      <td>5</td>
                      <td>10</td>
                      <td>5</td>
                      <td>0</td>
                      <td>5</td>
                      <td><Badge color="warning">25</Badge></td>
                    </tr>
                    <tr>
                      <td>Арина Аринова</td>
                      <td>10</td>
                      <td>5</td>
                      <td>10</td>
                      <td>5</td>
                      <td>10</td>
                      <td>10</td>
                      <td><Badge color="success">50</Badge></td>
                    </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i><Link to='groups/2'>iu4-82</Link>
                </CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                    <tr>
                      <th>Название</th>
                      <th>Мех. мат.</th>
                      <th>Начертательная геометрия</th>
                      <th>Высшая математика</th>
                      <th><strong>Сумма</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Александров Александр</td>
                      <td>10</td>
                      <td>5</td>
                      <td>0</td>
                      <td><Badge color="warning">15</Badge></td>
                    </tr>
                    <tr>
                      <td>Евгений Евгеньев</td>
                      <td>10</td>
                      <td>5</td>
                      <td>10</td>
                      <td><Badge color="success">25</Badge></td>
                    </tr>
                    <tr>
                      <td>Роман Романов</td>
                      <td>0</td>
                      <td>5</td>
                      <td>10</td>
                      <td><Badge color="warning">15</Badge></td>
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
