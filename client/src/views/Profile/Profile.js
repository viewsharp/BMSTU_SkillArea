import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie, Polar, Radar} from 'react-chartjs-2';
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
  Row
} from 'reactstrap';
import userService from "../../services/user";
import sessionService from "../../services/session";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      category: '',
      firstName: '',
      lastName: '',
      email: '',
      password: undefined,
      admin: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    const user = await userService.get();
    this.setState({
      username: user.username,
      category: user.category,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      admin: (await sessionService.get()).category === 'admin'
    });
  }

  handleChange(value, event) {
    this.setState({[value]: event.target.value})
  }

  async handleSubmit(event) {
    // TODO: add validation
    event.preventDefault();

    try {
      userService.update({
        category: this.state.category,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      });
    } catch (e) {
    }
  }


  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Роль</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Enter Role" disabled={!this.state.admin}
                               autoComplete="email" value={this.state.category}
                               onChange={this.handleChange.bind(this, 'category')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Фамилия</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Текст"
                               autoComplete="email" value={this.state.lastName}
                               onChange={this.handleChange.bind(this, 'lastName')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Имя</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Текст"
                               autoComplete="email" value={this.state.firstName}
                               onChange={this.handleChange.bind(this, 'firstName')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Отчество</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Текст"
                               autoComplete="email" value={this.state.lastName}
                               onChange={this.handleChange.bind(this, 'lastName')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">E-mail</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email" id="email-input" name="email-input" placeholder="Текст"
                               autoComplete="email" value={this.state.email}
                               onChange={this.handleChange.bind(this, 'email')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="password-input">Пароль</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="password" id="password-input" name="password-input" placeholder="*****"
                               autoComplete="new-password"
                               value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i className="fa fa-dot-circle-o"></i> Сохранить изменения</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Profile;
