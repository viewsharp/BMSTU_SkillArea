import Service from '../base/Service.js'
import disciplineService from './discipline.js'

class ActivityService extends Service {
  prefix = 'activities';

  create = ({title, text, date, place, discipline_id}) => this._call('create', {title, text, date, place, discipline_id});
  remove = (id) => this._call('remove', {id});
  get = (id) => this._call('get', {id});
  getList = (discipline_id) => this._call('get_list', {discipline_id});
}

class ActivityStorage {
  constructor() {
    this.data = [
      // {
      //   disciplineId: 1,
      //   title: 'Семинар #1',
      //   text: 'Текст к первому семинару',
      //   date: new Date(2019, 4, 15, 9, 0),
      //   place: '306ю'
      // },
      // {
      //   disciplineId: 1,
      //   title: 'Семинар #2',
      //   text: 'Текст к первому семинару',
      //   date: new Date(2019, 4, 16, 9, 0),
      //   place: '306ю'
      // },
      // {
      //   disciplineId: 1,
      //   title: 'Семинар #3',
      //   text: 'Текст к первому семинару',
      //   date: new Date(2019, 5, 17, 9, 0),
      //   place: '306ю'
      // },
      // {
      //   disciplineId: 1,
      //   title: 'Семинар #1',
      //   text: 'Текст к первому семинару',
      //   date: new Date(2019, 4, 15, 12, 0),
      //   place: '306ю'
      // },
      // {
      //   disciplineId: 2,
      //   title: 'Семинар #2',
      //   text: 'Текст к первому семинару',
      //   date: new Date(2019, 4, 16, 12, 0),
      //   place: '306ю'
      // },
      // {
      //   disciplineId: 3,
      //   title: 'Семинар #3',
      //   text: 'Текст к первому семинару',
      //   date: new Date(2019, 5, 18, 12, 0),
      //   place: '306ю'
      // }
    ];
  }


  async create({disciplineId, title, text, date, place}) {
    this.data.push({disciplineId, title, text, date, place});

    console.log(this.data);
    return this.data.length;
  }

  async getList(disciplineId) {
    return this.data
        .filter(activity => activity.disciplineId === disciplineId)
        .sort((left, right) => left.date - right.date);
  }

  async timeline() {
    const disciplines = await disciplineService.getList();
    return this.data
        .filter(activity => activity.date > new Date())
        .sort((left, right) => left.date - right.date)
        .map(activity => {activity.discipline = disciplines[activity.disciplineId]; return activity});
  }
}

export default new ActivityService();