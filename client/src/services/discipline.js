import Service from '../base/Service.js'

class DisciplineService extends Service {
  prefix = 'disciplines';

  create = ({name, group_id}) => this._call('create', {name, group_id});
  remove = (id) => this._call('remove', {id});
  get = (id) => this._call('get', {id});
  getList = (group_id) => this._call('get_list', {group_id});
}

class DisciplineStorage {
  constructor() {
    this.data = [{
      id: 0,
      name: 'Math',
      groupId: 0,
    }, {
      id: 1,
      name: 'Physics',
      groupId: 0,
    }, {
      id: 2,
      name: 'Software engineering',
      groupId: 0,
    }, {
      id: 3,
      name: 'Develop',
      groupId: 0,
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

export default new DisciplineService();