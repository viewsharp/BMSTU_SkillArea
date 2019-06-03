import Service from '../base/Service.js'

class MarkService extends Service {
  prefix = 'marks';

  getActivityUsersMarksList = (activity_id) => this._call('get_activity_users_marks_list', {activity_id});
  getUsersActivityMarksList = () => this._call('get_users_activity_marks_list', {});
  setActivityUsersMarksList = (activity_id, users_marks) => this._call('set_activity_users_marks_list', {
    activity_id,
    users_marks
  });
}

class MarkStorage {
  constructor() {
    this.data = [{
      id: 0,
      name: 'Math'
    }, {
      id: 1,
      name: 'Physics'
    }, {
      id: 2,
      name: 'Software engineering'
    }, {
      id: 3,
      name: 'Develop'
    }
    ];
  }


  async create({title, text}) {
    this.data.unshift({title, text});
    return this.data.length;
  }

  async getList() {
    return this.data;
  }
}

export default new MarkService();