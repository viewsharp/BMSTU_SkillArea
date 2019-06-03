import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Col, Form, FormGroup, Input, Label,
  Row, Table
} from 'reactstrap';
import activityService from "../../services/activity";
import markService from "../../services/mark";
import {Link} from "react-router-dom";
import groupService from "../../services/group";

function UserRow(props) {
  const user = props.user;
  const group = props.group;
  const userLink = `/users/${user.id}`;
  const name = `${user.first_name} ${user.last_name}`;

  return (
      <tr key={user.id.toString()}>
        <th scope="row"><Link to={userLink}>{user.id}</Link></th>
        <td><Link to={userLink}>{user.username}</Link></td>
        <td>{group ? group.name : ''}</td>
        <td><Link to={userLink}>{name}</Link></td>
        <td><Input type="number" id="text-input" name="text-input" placeholder="mark"
                   value={user.mark}/></td>
      </tr>
  )
}

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      text: '',
      usersMarks: [],
      group: [],
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
      const date = new Date(this.state.date);
      date.setHours(parseInt(this.state.hours), parseInt(this.state.minutes));

      await activityService.create({
        discipline_id: this.id,
        title: this.state.title,
        text: this.state.text,
        date: date.toUTCString(),
        place: this.state.place,
      });

      await this.componentWillMount();
    } catch (e) {
      alert(e)
    }
  }

  async componentWillMount() {
    this.id = parseInt(this.props.match.params.activity_id);
    const activity = await activityService.get(this.id);
    this.setState({
      title: activity.title,
      date: activity.date,
      text: activity.text,
      usersMarks: await markService.getActivityUsersMarksList(this.id),
      group: await groupService.getList()
    })
  }

  async componentDidUpdate() {
    if (this.id.toString() !== this.props.match.params.activity_id) {
      await this.componentWillMount();
    }
  }

  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <strong>Занятие</strong>
                </CardHeader>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Название</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="Текст" value={this.state.title}
                               onChange={this.handleChange.bind(this, 'title')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="date-input">Дата проведения</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="date" id="date-input" name="date-input" placeholder="Дата" value={this.state.date}
                               onChange={this.handleChange.bind(this, 'date')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Час</Label>
                      </Col>
                      <Col xs="3" md="3">
                        <Input type="number" id="text-input" name="text-input" placeholder="Число"
                               value={this.state.hours}
                               onChange={this.handleChange.bind(this, 'hours')}/>
                      </Col>
                      <Col md="3">
                        <Label htmlFor="text-input">Минута</Label>
                      </Col>
                      <Col xs="3" md="3">
                        <Input type="number" id="text-input" name="text-input" placeholder="Число"
                               value={this.state.minutes}
                               onChange={this.handleChange.bind(this, 'minutes')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Место</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="Текст" value={this.state.place}
                               onChange={this.handleChange.bind(this, 'place')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="textarea-input">Описание</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="textarea" name="textarea-input" id="textarea-input" rows="6"
                               placeholder="Текст" value={this.state.text}
                               onChange={this.handleChange.bind(this, 'text')}/>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}>
                    <i className="fa fa-dot-circle-o"></i> Сохранить измеения</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
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
                      <th scope="col">Группа</th>
                      <th scope="col">Имя</th>
                      <th scope="col">Оценка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.usersMarks.map((user, i) =>
                        <UserRow key={i} user={user}
                                 group={this.state.group.filter(group => group.id === user.group_id)[0]}/>
                    )}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}>
                    <i className="fa fa-dot-circle-o"></i> Сохранить</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Activity;
