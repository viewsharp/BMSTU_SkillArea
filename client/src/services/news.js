import Service from '../base/Service.js'

class UserService extends Service {
  prefix = 'users';

  create = ({username, email, password}) => this._call('create', {username, email, password});
}

class UserStorage {
  constructor() {
    this.data = [{
      username: 'test',
      email: 'test',
      password: 'test',
    }];
  }


  async create({username, email, password}) {
    this.data.push({username, email, password});
    return this.data.length;
  }

  async get(id) {
    return this.data[id - 1];
  }
}

export default new UserStorage();