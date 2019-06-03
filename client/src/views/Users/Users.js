import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import userService from '../../services/user.js'
import groupService from '../../services/group.js'

function UserRow(props) {

  const user = props.user;
  const group = props.group;
  const userLink = `/users/${user.id}`;
  const name = `${user.first_name} ${user.last_name}`;

  return (
      <tr key={user.id.toString()}>
        <th scope="row"><Link to={userLink}>{user.id}</Link></th>
        <td><Link to={userLink}>{user.username}@mail.ru</Link></td>
        <td>{group ? group.name: ''}</td>
        <td><Link to={userLink}>{name}</Link></td>
        <td>{user.category}</td>
      </tr>
  )
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groups: []
    }
  }

  async componentWillMount() {
    this.setState({
      users: await userService.getList(),
      group: await groupService.getList()
    })
  }

  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Пользователи
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Группа</th>
                      <th scope="col">Имя</th>
                      <th scope="col">Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user, i) =>
                        <UserRow key={i} user={user}
                                 group={this.state.group.filter(group => group.id === user.group_id)[0]}/>
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

export default Users;
