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
import ArrivalPage from '../pages/arrival.f7.html';
import BillListPage from '../pages/bill-list.f7.html';
import BillPage from '../pages/bill.f7.html';
import BillDetailPage from '../pages/bill-details.f7.html';
import PaymentListPage from '../pages/payment-list.f7.html'
import AddFamilyPage from '../pages/add-family.f7.html';
import AnnouncementListPage from '../pages/announcement-list.f7.html';
import PropertyPage from '../pages/property.f7.html';
import PropertyListPage from '../pages/property-list.f7.html'
import ChangePassPage from '../pages/change-pass.f7.html';
import ContactsPage from '../pages/contacts.f7.html';
import EditVisitorPage from '../pages/edit-visitor.f7.html';
import SupportPage from '../pages/contact-us.f7.html';
import EditSchedulePage from '../pages/edit-schedule.f7.html';
import RegisterPage from '../pages/register.f7.html';
import FaqPage from '../pages/faq.f7.html';
var routes = [{
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: LoginPage,

  },
  {
    path: '/register/',
    component: RegisterPage,

  },
  {
    path: '/forgot/',
    component: ForgotPage,

  },
  {
    path: '/schedule/:name/:phone/:plate/:link',
    name:'schedule',
    component: SchedulePage,

  },
  {
    path: '/schedule/:link',
    component: SchedulePage,

  },
  {
    path: '/schedule/',
    component: SchedulePage,

  },
  {
    path: '/edit-schedule/:id',
    component: EditSchedulePage,

  },
  {
    path:'/contacts/',
    component:ContactsPage,
  },
  {
    path: '/visitor-list/:id',
    component: VisitorListPage,

  },
  {
    path: '/add-visitor/:name/:phone',
    name:'add-visitor',
    component: AddVisitorPage,

  },
  {
    path:'/add-visitor/',
    component:AddVisitorPage,
  },
  {
    path:'/edit-visitor/:id',
    component:EditVisitorPage,
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
    path:'/add-family/:id',
    component: AddFamilyPage,
  },
  {
    path:'/bill/',
    component:BillPage,
  },
  {
    path:'/bill-details/:id',
    component:BillDetailPage,
  },
  {
    path:'/pay-bills/:id',
    component: PayBillsPage,
  },
  
  {
    path:'/notification/',
    component:NotificationPage,
  },
  {
    path:'/qr/:id/:link',
    component:QrPage,
  },
  {
    path:'/announcement/:id',
    component:AnnouncementPage,
  },
  {
    path:'/announcement-list/',
    component:AnnouncementListPage,
  },
  {
    path:'/arrival/:id',
    component:ArrivalPage,
  },
  {
    path:'/bill-list/:id/:property_index',
    component:BillListPage,
  },
  {
    path:'/payment-list/',
    component:PaymentListPage,
  },
  {
    path:'/property/:id',
    component:PropertyPage,
  },
  {
    path:'/support/',
    component:SupportPage,
  },
  {
    path:'/property-list/',
    component:PropertyListPage,
  },
  {
    path:'/faq/',
    component:FaqPage,
  },
  {
    path:'/change-pass/',
    component:ChangePassPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;