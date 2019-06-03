import Service from '../base/Service.js'

class GroupService extends Service {
  prefix = 'groups';

  create = ({name}) => this._call('create', {name});
  remove = (id) => this._call('remove', {id});
  get = (id) => this._call('get', {id});
  getList = () => this._call('get_list', {});
}

export default new GroupService();