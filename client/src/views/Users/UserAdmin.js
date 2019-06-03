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
import groupService from "../../services/group";

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
      group_id: 0,
      groups: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    this.id = parseInt(this.props.match.params.id);
    const user = await userService.get(parseInt(this.props.match.params.id));
    this.setState({
      id: user.id,
      username: user.username,
      category: user.category,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      group_id: user.group_id,
      groups: await groupService.getList()
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
        group_id: this.state.group_id,
      });
    } catch (e) {
      alert(e);
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
                    {/*<FormGroup row>*/}
                    {/*  <Col md="3">*/}
                    {/*    <Label htmlFor="disabled-input">Username</Label>*/}
                    {/*  </Col>*/}
                    {/*  <Col xs="12" md="9">*/}
                    {/*    <Input type="text" id="disabled-input" name="disabled-input" placeholder="Disabled" disabled value={this.state.username}/>*/}
                    {/*  </Col>*/}
                    {/*</FormGroup>*/}
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Роль</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Enter Role"
                               autoComplete="email" value={this.state.category}
                               onChange={this.handleChange.bind(this, 'category')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Группа</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" name="select" id="select" value={this.state.group_id}
                               onChange={this.handleChange.bind(this, 'group_id')}>
                          {this.state.groups.map((group, i) => group === this.state.group_id ?
                              <option value={group.id} key={i} selected>{group.name}</option> :
                              <option value={group.id} key={i}>{group.name}</option>
                          )}
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Фамилия</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Enter Last name"
                               autoComplete="email" value={this.state.lastName}
                               onChange={this.handleChange.bind(this, 'lastName')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Имя</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Enter First name"
                               autoComplete="email" value={this.state.firstName}
                               onChange={this.handleChange.bind(this, 'firstName')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Отчество</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="email-input" name="email-input" placeholder="Enter First name"
                               autoComplete="email" value="Витальевич"
                               onChange={this.handleChange.bind(this, 'firstName')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">E-mail</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email" id="email-input" name="email-input" placeholder="Enter Email"
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

export default User;
