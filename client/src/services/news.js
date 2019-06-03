import Service from '../base/Service.js'

class NewsService extends Service {
  prefix = 'news';

  create = ({title, text}) => this._call('create', {title, text});
  remove = (id) => this._call('remove', {id});
  // get = (id) => this._call('get', {id});
  getList = () => this._call('get_list', {});
}

class NewsStorage {
  constructor() {
    this.data = [{
      title: 'Test News',
      text: 'text of test news'
    }];
  }


  async create({title, text}) {
    this.data.unshift({title, text});
    return this.data.length;
  }

  async getList() {
    return this.data;
  }
}

export default new NewsService();