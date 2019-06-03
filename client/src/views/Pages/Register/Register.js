import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody, CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import userService from "../../../services/user.js";
import {Link} from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordRep: '',
      firstName: '',
      lastName: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value, event) {
    this.setState({[value]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();

    // TODO: add validation
    if (this.state.password !== this.state.passwordRep) {
      alert('Passwords do not match');
    }

    try {
      await userService.create({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      });
      this.props.history.push('/login');
    } catch (e) {
      alert(e.message);
    }
  }

  render() {
    return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="text-white bg-primary py-5">
                    <CardBody className="text-center py-5">
                      <div className="text-center py-5">
                        <h2>Войти в аккаунт</h2>
                        <Link to="/login">
                          <Button color="primary" className="mt-3" active tabIndex={-1}>Авторизация</Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                  <Card className="p-4" style={{width: '56%'}}>
                    <CardBody>
                      <Form>
                        <h1>Регистрация</h1>
                        <p className="text-muted">Создать ваш аккаунт</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Фамилия" autoComplete="username" value={this.state.username}
                                 onChange={this.handleChange.bind(this, 'username')}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Имя" autoComplete="firstName" value={this.state.firstName}
                                 onChange={this.handleChange.bind(this, 'firstName')}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="Отчествоe" autoComplete="lastName" value={this.state.lastName}
                                 onChange={this.handleChange.bind(this, 'lastName')}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="E-mail" autoComplete="email" value={this.state.email}
                                 onChange={this.handleChange.bind(this, 'email')}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Пароль" autoComplete="new-password"
                                 value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Повторите пароль" autoComplete="new-password"
                                 value={this.state.passwordRep} onChange={this.handleChange.bind(this, 'passwordRep')}/>
                        </InputGroup>
                        <Button color="success" onClick={this.handleSubmit} block>Создать аккаунт</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Register;
