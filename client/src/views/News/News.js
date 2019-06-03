import React, {Component} from 'react';
import newsService from '../../services/news.js';
import sessionService from '../../services/session.js';
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
} from 'reactstrap';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      newss: [],
      admin: false,
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
      await newsService.create({title: this.state.title, text: this.state.text});
      await this.componentDidMount();
    } catch (e) {
      alert(e);
    }
  }

  async componentWillMount() {
    this.setState({
      newss: await newsService.getList(),
      admin: (await sessionService.get()).category === 'admin',
    });
  }

  render() {
    return (
        <div className="animated fadeIn">
          {this.state.newss.map((news, i) =>
              <Row key={i}>
                <Col xs="12">
                  <Card>
                    <CardHeader>
                      {news.title} <small className="text-muted">{new Date(news.created_at).toUTCString()}</small>
                    </CardHeader>
                    <CardBody>
                      {news.text}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          )}
        </div>
    );
  }
}

export default News;
