import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import sessionService from "../../../services/session.js";
import {ACCESS_ID_STORAGE_KEY} from "../../../settings";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value, event) {
    this.setState({[value]: event.target.value})
  }

  async handleSubmit(event) {
    // TODO: add validation
    event.preventDefault();

    try {
      const session = await sessionService.create({username: this.state.username, password: this.state.password});
      localStorage.setItem(ACCESS_ID_STORAGE_KEY, session.access_key);
      this.props.history.push('/');
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
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h1>Авторизация</h1>
                        <p className="text-muted">Войти в свой аккаунт</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" placeholder="E-mail" autoComplete="username" value={this.state.username}
                                 onChange={this.handleChange.bind(this, 'username')}/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Пароль" autoComplete="current-password"
                                 value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button color="primary" className="px-4" onClick={this.handleSubmit}>Войти</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="text-white bg-primary py-5" style={{width: '44%'}}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Создать аккаунт</h2>
                        <Link to="/register">
                          <Button color="primary" className="mt-3" active tabIndex={-1}>Регистрация</Button>
                        </Link>
                      </div>
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

export default Login;
