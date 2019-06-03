import Service from '../base/Service.js'
import UserService from './user.js'

class SessionService extends Service {
  prefix = 'sessions';

  create = ({username, password}) => this._call('create', {username, password});
  get = () => this._call('get', {})
}

class SessionStorage {
  create({username, password}) {
    const user = UserService.data.filter(user => user.username === username && user.password === password);
    if (user.length === 0) {
      throw Error('login or password is uncorrect');
    }

    UserService.current = {
      email: user[0].email,
      username: user[0].username
    };
    return {access_id: 0}
  }

  get() {
    return {access_id: 0}
  }
}

export default new SessionService();