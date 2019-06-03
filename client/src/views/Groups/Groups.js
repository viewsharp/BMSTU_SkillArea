import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table
} from 'reactstrap';
import groupService from '../../services/group.js'

function GroupRow(props) {

  const group = props.group;
  const userLink = `/groups/${group.id}`;

  return (
      <tr key={group.id.toString()}>
        <th scope="row"><Link to={userLink}>{group.id}</Link></th>
        <td><Link to={userLink}>{group.name}</Link></td>
        <td>{group.students_count}</td>
        <td>{group.disciplines_count}</td>
      </tr>
  )
}

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      name: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    this.setState({
      groups: await groupService.getList()
    })
  }

  handleChange(value, event) {
    this.setState({[value]: event.target.value})
  }

  async handleSubmit(event) {
    // TODO: add validation
    event.preventDefault();

    try {
      console.log(this.state);
      await groupService.create({name: this.state.name});
      await this.componentWillMount();
    } catch (e) {
      if (e.data) {
        alert(e.data.message)
      } else  {
        alert(e)
      }
    }
  }

  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <strong>Добавить группу</strong>
                </CardHeader>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Название</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="Text" value={this.state.name}
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
                  <i className="fa fa-align-justify"></i> Группы
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Название</th>
                      <th scope="col">Студенты</th>
                      <th scope="col">Дисциплины</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.groups.map((group, i) =>
                        <GroupRow key={i} group={group}/>
                    )}
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

export default Groups;
