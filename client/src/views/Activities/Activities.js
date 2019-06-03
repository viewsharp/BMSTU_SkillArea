import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
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
        disciplineId: this.id,
        title: this.state.title,
        text: this.state.text,
        date: date,
        place: this.state.place,
      });

      await this.componentWillMount();
    } catch (e) {
      alert(e);
    }
  }

  async componentWillMount() {
    this.id = parseInt(this.props.match.params.id);
    this.setState({
      activities: await activityService.getList(parseInt(this.props.match.params.id)),
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
          {this.state.activities.map((activity, i) =>
              <Row key={i}>
                <Col xs="12">
                  <Card>
                    <CardHeader>
                      <strong>{activity.title}</strong> {activity.date}
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
