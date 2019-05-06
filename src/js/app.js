import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';
import methods from './contorller.js';
//declare var
var mainView;
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.simedarbyelminaresident', // App bundle ID
  name: 'Elmina Resident', // App name
  theme: 'md', // Automatic theme detection
  data: function () {
    return {
      user: this.form.getFormData('auth'),
    }
  },
  // App routes
  routes: routes,
  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    overlay: Framework7.device.cordova && Framework7.device.ios || 'auto',
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  view:{
    stackPages:true,
  },
  methods: methods,
  on: {
    init: function () {
      var f7 = this;
      mainView = f7.views.create('.view-main');
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
      if (f7.data.user) {
        mainView.router.navigate('/');
        mainView.router.clearPreviousHistory();
      } else {
        mainView.router.navigate('/login/');
      }
    },
  },
});
//global events
window.addEventListener('keyboardWillShow', function () {
  app.toolbar.hide('.toolbar', false);
});
window.addEventListener('keyboardWillHide', function () {
  app.toolbar.show('.toolbar');
});