import Service from '../base/Service.js'

class UserService extends Service {
  prefix = 'users';

  create = ({username, email, password, first_name, last_name}) => this._call('create', {username, email, password, first_name, last_name});
  update = ({id, email, password, category, first_name, last_name, group_id}) => this._call('update', {id, email, password, category, first_name, last_name, group_id});
  get = (id) => this._call('get', {id});
  getList = (group_id) => this._call('get_list', {group_id: group_id});
}

class UserStorage {
  constructor() {
    this.data = [{
      username: 'test',
      email: 'test',
      password: 'test',
    }];

    this.current = undefined;
  }


  async create({username, email, password}) {
    const users = this.data.filter(user => user.username === username);
    if (users.length !== 0) {
      throw Error('Username already exists');
    }

    this.data.push({username, email, password});
    return this.data.length;
  }

  async get() {
    return this.current;
  }

  async update({username, email, password}) {
    const users = this.data.filter(user => user.username === username);
    if (users.length === 0) {
      throw Error('Username not exists');
    }

    users[0].email = email || users[0].email;
    users[0].password = password || users[0].password;

    this.current = {
      username: username,
      email: email
    };
  }
}

export default new UserService();