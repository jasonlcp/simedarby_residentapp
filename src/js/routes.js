import HomePage from '../pages/home.f7.html';
import NotFoundPage from '../pages/404.f7.html';
import LoginPage from '../pages/login.f7.html';
import ProfilePage from '../pages/profile.f7.html';
import SchedulePage from '../pages/schedule.f7.html';
import VisitorListPage from '../pages/visitor-list.f7.html'

var routes = [{
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: LoginPage,

  },
  {
    path: '/schedule/:name/:phone/:plate',
    name:'schedule',
    component: SchedulePage,

  },
  {
    path: '/schedule/',
    component: SchedulePage,

  },
  {
    path: '/visitor-list/',
    component: VisitorListPage,

  },
  {
    path: '/profile/',
    component: ProfilePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;