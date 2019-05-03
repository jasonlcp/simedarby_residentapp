import $$ from 'dom7';
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
//declare var
var storedData;
var mainView;
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.simedarbyelminaresident', // App bundle ID
  name: 'Elmina Resident', // App name
  theme: 'md', // Automatic theme detection
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
  on: {
    init: function () {
      var f7 = this;
      mainView = f7.views.create('.view-main');
      storedData = f7.form.getFormData('auth');
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
      if (storedData){
        mainView.router.navigate('/');
        mainView.router.clearPreviousHistory();
      }else{
        mainView.router.navigate('/login/');
      }
    },
  },
});
