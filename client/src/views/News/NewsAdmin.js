import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import newsService from '../../services/news.js';
import sessionService from '../../services/session.js';
import {
  Badge, Button,
  Card,
  CardBody,
  CardColumns,
  CardFooter,
  CardHeader,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label
} from 'reactstrap';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      newss: [],
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
      await this.componentWillMount();
    } catch (e) {
      alert(e);
    }
  }

  async componentWillMount() {
    this.setState({
      newss: await newsService.getList(),
    });
  }

  render() {
    return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <strong>Добавить новость</strong>
                </CardHeader>
                <CardBody>
                  <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Заголовок</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="text-input" name="text-input" placeholder="Текст" value={this.state.title}
                               onChange={this.handleChange.bind(this, 'title')}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="textarea-input">Содержание</Label>
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
                  <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit}><i
                      className="fa fa-dot-circle-o"></i> Добавить</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
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
