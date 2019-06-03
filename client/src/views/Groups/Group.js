import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Row, Form, FormGroup, Label, Input, CardFooter, Button
} from "reactstrap";
import {Link} from "react-router-dom";
import userService from "../../services/user";
import disciplineService from "../../services/discipline";

function UserRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;
  const name = `${user.first_name} ${user.last_name}`;

  return (
      <tr key={user.id.toString()}>
        <th scope="row"><Link to={userLink}>{user.id}</Link></th>
        <td><Link to={userLink}>{user.username}@mail.ru</Link></td>
        <td><Link to={userLink}>{name}</Link></td>
        <td>{user.category}</td>
      </tr>
  )
}

function DisciplineRow(props) {
  const discipline = props.discipline;
  const groupId = props.groupId;
  const userLink = `/groups/${groupId}/disciplines/${discipline.id}`;

  return (
      <tr key={discipline.id.toString()}>
        <th scope="row"><Link to={userLink}>{discipline.id}</Link></th>
        <td><Link to={userLink}>{discipline.name}</Link></td>
      </tr>
  )
}

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      disciplines: [],
      name: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    this.id = parseInt(this.props.match.params.id);
    this.setState({
      users: await userService.getList(parseInt(this.id)),
      disciplines: await disciplineService.getList(parseInt(this.id))
    })
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
      await disciplineService.create({
        name: this.state.name,
        group_id: this.id
      });
      await this.componentWillMount();
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Дисциплины
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Название</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.disciplines.map((discipline, i) =>
                        <DisciplineRow key={i} discipline={discipline} groupId={this.id}/>
                    )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <strong>Добавить дисциплину</strong>
                </CardHeader>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Название</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="Текст" value={this.state.name}
                               onChange={this.handleChange.bind(this, 'name')}/>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i
                      className="fa fa-dot-circle-o"></i> Добавить</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Студенты
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Имя</th>
                      <th scope="col">Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user, i) =>
                        <UserRow key={i} user={user}/>
                    )}
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

export default Group;
