import React, {Component} from 'react';
import {
  Badge, Button,
  Card,
  CardBody,
  CardColumns, CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Table
} from 'reactstrap';
import userService from "../../services/user";
import sessionService from "../../services/session";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      username: '',
      category: '',
      firstName: '',
      lastName: '',
      email: '',
      password: undefined,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    this.id = parseInt(this.props.match.params.id);
    const user = await userService.get(parseInt(this.id));
    this.setState({
      id: user.id,
      username: user.username,
      category: user.category,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
  }

  async componentDidUpdate() {
    if (this.id.toString() !== this.props.match.params.id) {
      await this.componentWillMount();
    }
  }

  handleChange(value, event) {
    this.setState({[value]: event.target.value})
  }

  async handleSubmit(event) {
    // TODO: add validation
    event.preventDefault();

    try {
      userService.update({
        id: this.state.id,
        category: this.state.category,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col lg={6}>
              <Card>
                <CardHeader>
                  <strong><i className="icon-info pr-1"></i>User id: {this.props.match.params.id}</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                    <tr>
                      <td>Id</td>
                      <td><strong>{this.state.id}</strong></td>
                    </tr>
                    {/*<tr>*/}
                    {/*  <td>Username</td>*/}
                    {/*  <td><strong>{this.state.username}</strong></td>*/}
                    {/*</tr>*/}
                    <tr>
                      <td>Роль</td>
                      <td><strong>{this.state.category}</strong></td>
                    </tr>
                    <tr>
                      <td>Фамилия</td>
                      <td><strong>{this.state.lastName}</strong></td>
                    </tr>
                    <tr>
                      <td>Имя</td>
                      <td><strong>{this.state.firstName}</strong></td>
                    </tr>
                    <tr>
                      <td>Отчество</td>
                      <td><strong>Витальевич</strong></td>
                    </tr>
                    <tr>
                      <td>E-mail</td>
                      <td><strong>{this.state.email}</strong></td>
                    </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
    )
  }
}

export default User;
