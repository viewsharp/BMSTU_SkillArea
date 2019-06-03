import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const News = React.lazy(() => import('./views/News/News'));
const Profile = React.lazy(() => import('./views/Profile/Profile'));
const Activities = React.lazy(() => import('./views/Activities/Activities'));
const Marks = React.lazy(() => import('./views/Marks/Marks'));
const MarksAdmin = React.lazy(() => import('./views/Marks/MarksAdmin'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

export const user_routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: News },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/disciplines/:id', exact: true, name: 'Discipline Activities', component: Activities},
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/marks', name: 'Marks', component: Marks },
];

const NewsAdmin = React.lazy(() => import('./views/News/NewsAdmin'));
const UserAdmin = React.lazy(() => import('./views/Users/UserAdmin'));
const ActivitiesAdmin = React.lazy(() => import('./views/Activities/ActivitiesAdmin'));
const ActivityAdmin = React.lazy(() => import('./views/Activities/ActivityAdmin'));
const Group = React.lazy(() => import('./views/Groups/Group'));
const Groups = React.lazy(() => import('./views/Groups/Groups'));

export const admin_routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: NewsAdmin },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/groups', exact: true,  name: 'Groups', component: Groups },
  { path: '/groups/:id', exact: true, name: 'Group Details', component: Group },
  { path: '/groups/:group_id/disciplines/:id/', exact: true, name: 'Discipline Details', component: ActivitiesAdmin },
  { path: '/groups/:group_id/disciplines/:id/:activity_id', exact: true, name: 'Discipline Activity Details', component: ActivityAdmin },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/marks', name: 'Marks', component: MarksAdmin },
];