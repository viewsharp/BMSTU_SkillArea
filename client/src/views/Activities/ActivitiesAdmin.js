import React, {Component} from 'react';
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
} from 'reactstrap';
import {Link} from 'react-router-dom';
import activityService from "../../services/activity.js";

class Disciplines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      date: '',
      hours: '',
      minutes: '',
      place: '',
      activities: []
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
    this.id = parseInt(this.props.match.params.id);
    const activities = await activityService.getList(this.id);
    activities.forEach(activity => activity.date = new Date(activity.date));
    this.setState({
      activities: activities,
    })
  }

  async componentDidUpdate() {
    if (this.id.toString() !== this.props.match.params.id) {
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
                  <strong>Добавить занятие</strong>
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
                    <i className="fa fa-dot-circle-o"></i> Добавить</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          {this.state.activities.map((activity, i) =>
              <Row key={i}>
                <Col xs="12">
                  <Card>
                    <CardHeader>
                      <Link to={`/groups/${this.props.match.params.group_id}/disciplines/${this.id}/${activity.id}`}>{activity.title}</Link> {activity.date.toUTCString()}
                    </CardHeader>
                    <CardBody>
                      {activity.text}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          )}
        </div>
    );
  }
}

export default Disciplines;
