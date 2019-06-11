import HomePage from '../pages/home.f7.html';
import NotFoundPage from '../pages/404.f7.html';
import LoginPage from '../pages/login.f7.html';
import ProfilePage from '../pages/profile.f7.html';
import SchedulePage from '../pages/schedule.f7.html';
import VisitorListPage from '../pages/visitor-list.f7.html';
import ForgotPage from '../pages/forgot.f7.html';
import AddVisitorPage from '../pages/add-visitor.f7.html';
import FamilyListPage from '../pages/family-list.f7.html';
import NotificationPage from '../pages/notification.f7.html';
import VisitsPage from '../pages/visits.f7.html';
import PayBillsPage from '../pages/pay-bills.f7.html';
import QrPage from '../pages/qr.f7.html';
import AnnouncementPage from '../pages/announcement.f7.html';
import ArrivalPage from '../pages/arrival.f7.html'
import BillsPage from '../pages/bills.f7.html'
import AddFamilyPage from '../pages/add-family.f7.html';
import AnnouncementListPage from '../pages/announcement-list.f7.html';
import PropertyPage from '../pages/property.f7.html';
var routes = [{
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: LoginPage,

  },
  {
    path: '/forgot/',
    component: ForgotPage,

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
    path:'/add-visitor/',
    component:AddVisitorPage,
  },
  {
    path:'/visits/',
    component:VisitsPage,
  },
  {
    path: '/profile/',
    component: ProfilePage,
  },
  {
    path:'/family-list/',
    component: FamilyListPage,
  },
  {
    path:'/add-family/',
    component: AddFamilyPage,
  },
  {
    path:'/pay-bills/',
    component: PayBillsPage,
  },
  {
    path:'/notification/',
    component:NotificationPage,
  },
  {
    path:'/qr/',
    component:QrPage,
  },
  {
    path:'/announcement/',
    component:AnnouncementPage,
  },
  {
    path:'/announcement-list/',
    component:AnnouncementListPage,
  },
  {
    path:'/arrival/',
    component:ArrivalPage,
  },
  {
    path:'/bills/',
    component:BillsPage,
  },
  {
    path:'/property/',
    component:PropertyPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;