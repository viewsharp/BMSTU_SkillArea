import React, {Component} from 'react';
import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import activityService from "../../services/activity";
import disciplineService from "../../services/discipline";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disciplines: [],
      todayActivities: [],
      tomorrowActivities: [],
      other: [],
    }
  }

  async componentDidMount() {
    const activities = await activityService.getList();
    activities.forEach(activity => activity.date = new Date(activity.date));

    let date = new Date(); // today
    const todayActivities = activities.filter(activity => {
      return activity.date.getDate() === date.getDate()
          && activity.date.getMonth() === date.getMonth()
          && activity.date.getFullYear() === date.getFullYear()
    });

    date.setDate(date.getDate() + 1); // tomorrow
    const tomorrowActivities = activities.filter(activity => {
      return activity.date.getDate() === date.getDate()
          && activity.date.getMonth() === date.getMonth()
          && activity.date.getFullYear() === date.getFullYear()
    });

    date.setDate(date.getDate() + 1); // post-tomorrow
    const other = activities.filter(activity => {
      return activity.date.getDate() >= date.getDate()
          && activity.date.getMonth() >= date.getMonth()
          && activity.date.getFullYear() >= date.getFullYear()
    });

    this.setState({
      todayActivities: todayActivities,
      tomorrowActivities: tomorrowActivities,
      other: other,
      disciplines: await disciplineService.getList()
    });
  }

  render() {

    // eslint-disable-next-line
    const {children, ...attributes} = this.props;

    return (
        <React.Fragment>
          <ListGroup className="list-group-accent" tag={'div'}>
            <ListGroupItem
                className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Сегодня</ListGroupItem>
            {this.state.todayActivities.map((activity, i) =>
                <ListGroupItem action key={i} tag="a" href={`/#/disciplines/${this.state.disciplines.filter(discipline => discipline.id === activity.discipline_id)[0].id}`}>
                  <div>
                    <strong>{this.state.disciplines.filter(discipline => discipline.id === activity.discipline_id)[0].name}</strong> {activity.title}
                  </div>
                  <small className="text-muted mr-3">
                    <i className="icon-calendar"></i> {activity.date.toLocaleTimeString()}
                  </small>
                  <small className="text-muted">
                    <i className="icon-location-pin"></i>{activity.place}
                  </small>
                </ListGroupItem>)}
            <ListGroupItem
                className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Завтра</ListGroupItem>
            {this.state.tomorrowActivities.map((activity, i) =>
                <ListGroupItem action key={i} tag="a" href={`/#/disciplines/${this.state.disciplines.filter(discipline => discipline.id === activity.discipline_id)[0].id}`}>
                  <div><strong>{this.state.disciplines.filter(discipline => discipline.id === activity.discipline_id)[0].name}</strong> {activity.title}</div>
                  <small className="text-muted mr-3">
                    <i className="icon-calendar"></i> {activity.date.toLocaleTimeString()}
                  </small>
                  <small className="text-muted">
                    <i className="icon-location-pin"></i>{activity.place}
                  </small>
                </ListGroupItem>)}
            <ListGroupItem
                className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Далее</ListGroupItem>
            {this.state.other.map((activity, i) =>
                <ListGroupItem action key={i} tag="a" href={`/#/disciplines/${this.state.disciplines.filter(discipline => discipline.id === activity.discipline_id)[0].id}`}>
                  <div><strong>{this.state.disciplines.filter(discipline => discipline.id === activity.discipline_id)[0].name}</strong> {activity.title}
                    <small><i className="icon-location-pin"></i>{activity.place}</small>
                  </div>
                  <small className="text-muted">
                    <i className="icon-calendar"></i> {activity.date.toUTCString()}
                  </small>
                </ListGroupItem>)}
          </ListGroup>
        </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
