export function admin_nav() {
  return {
    items: [
      {
        name: 'Новости',
        url: '/home',
        icon: 'icon-home',
      },
      {
        name: 'Пользователи',
        url: '/users',
        icon: 'icon-user',
      },
      {
        name: 'Группы',
        url: '/groups',
        icon: 'icon-layers',
      },
      {
        name: 'Оценки',
        url: '/marks',
        icon: 'icon-star',
      },
    ]
  };
}

export function user_nav(disciplines)  {
  return {
    items: [
      {
        name: 'Новости',
        url: '/home',
        icon: 'icon-home',
      },
      {
        name: 'Пользователи',
        url: '/users',
        icon: 'icon-user',
      },
      {
        name: 'Дисциплины',
        url: '/disciplines',
        icon: 'icon-puzzle',
        children: disciplines.map(discipline => {
          return {
            name: discipline.name,
            url: '/disciplines/' + discipline.id,
            icon: 'icon-puzzle',
          }
        }),
      },
      {
        name: 'Оценки',
        url: '/marks',
        icon: 'icon-star',
      }
    ],
  };
};
