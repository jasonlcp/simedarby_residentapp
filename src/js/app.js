import Framework7 from 'framework7/framework7.esm.bundle.js'; 
import sound_audio from './sound_audio.js'
// Import F7 Styles
import 'framework7/css/framework7.bundle.css';
import Template7 from 'template7';
// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';
import '../css/all.css'
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';
import methods from './contorller.js';
import config from './config.js';
import socket from 'socket.io-client/dist/socket.io.js';
//declare var
import $$ from 'dom7';

var mainView;
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.simedarbyelminaresident', // App bundle ID
  name: 'Sime Darby Resident', // App name
  theme: 'md',
  version:'1.0.33', // Automatic theme detection
  // App routes
  routes: routes,
  touch: {
    // Enable fast clicks
    fastClicks: false,
  },
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
  view: {
    stackPages: true,
  },
  methods: methods,
  on: {
    init: function () {
      var f7 = this;
      mainView = f7.views.create('.view-main');
      this.form.removeFormData('selectedLot');
      this.form.removeFormData('entryVal');
      this.form.removeFormData('notify');
      this.form.removeFormData('startDate');
      this.form.removeFormData('endDate');
      this.form.removeFormData('days');
      var sck = socket.connect(config.SOCKET);
      console.log(sck.connected);
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
        $$(document).on('deviceready', function () {
          var push = PushNotification.init({
            android: {
              alert: "true",
              badge: "true",
              sound: "true",
            },
            browser: {},
            ios: {
              alert: "true",
              badge: "true",
              sound: "true"
            },
            windows: {}
          });
          
          push.on('registration', function (data) {
              // data.registrationId
              console.log('register: ' + JSON.stringify(data));
              var old_id =f7.form.getFormData('reg_id'); 
              var old_device_id = f7.form.getFormData('device_id');
              if( old_id != data.registrationId){
                f7.form.storeFormData('reg_id', data.registrationId);
              }
              if(old_device_id != device.uuid){
                f7.form.storeFormData('device_id', device.uuid);
              }
              //alert(data.registrationId);
              // mainView.router.navigate('/notification/')
            console.log(data.registrationId);
            console.log(device.uuid);
          });

          // push.on('notification', function (data) {
          //   var auth = app.form.getFormData('auth');
          //   console.log(auth);
          //   if (!auth){

          //   }else{
          //   console.log('notification: ' + data);
          //   //alert("Title:" + data.title + " Message:" + data.message);
          //   setTimeout(function() {
          //   mainView.router.navigate('/notification/');
          //   },1000);
          //   }
          // });
          
          push.on('error', function (e) {
            console.log('error: ' +e.message)
          });
        });
       
        document.addEventListener("resume", onResume, false);
        function onResume() {
     

            setTimeout(function() {
            
              if(  app.view.current.router.url.includes("/bill-details/")){
                  mainView.router.navigate(app.view.current.router.url, {
                    ignoreCache  : true,
                    reloadCurrent : true
                  });
              }else{
                console.log(sck.connected)
                if(sck.connected == false){
                  f7.methods.getUserLot(function (data) {
                    var d = JSON.parse(data.response);
                    console.log(d);
                    sck.emit('user', {
                      id: d.user.id,
                      role: 'resident',
                      lot: d.lot
                    });
                  });
                }
              }

                   
                }, 300);
        }

      }

      if (f7.methods.getUser()) {
        console.log(f7.methods.getUser().token)
        mainView.router.navigate('/');
        mainView.router.clearPreviousHistory();
        f7.methods.getUserLot(function (data) {
          var d = JSON.parse(data.response);
          console.log(d);
          sck.emit('user', {
            id: d.user.id,
            role: 'resident',
            lot: d.lot
          });
        });
      } else {
        mainView.router.navigate('/login/');
        mainView.router.clearPreviousHistory();
      }


      sck.on('visitor_out', function (data) {
        app.methods.getNotificationCount();

        navigator.vibrate(500);

        var notification_sound =sound_audio.sound_out;

        notification_sound.play();
  
        var notificationCallbackOnClose = app.notification.create({
          icon: '<i class="icon f7-icons">person_round</i>',
          title: "Your visitor has left!",
          titleRightText: 'now',
          subtitle: data.title,
          text: 'Click here to close',
          closeOnClick: true,
          on: {
            close: function () {
            
              console.log(data);
              mainView.router.navigate('/arrival/' + data.track_id);
              app.methods.updateNotification('id'+data.track_id);
            },
          },
        });
        notificationCallbackOnClose.open();
      })

      sck.on('visitor_arrive', function (data) {
        app.methods.getNotificationCount();
        navigator.vibrate(500);
        console.log(data);
        

        var notification_sound =sound_audio.sound_in;
        var loop_sound = null;
        notification_sound.play();
        var count =0 ;
        loop_sound=  setInterval(function () {
                        
                      if(count==4){
                        clearInterval(loop_sound);
                      }else{
                        notification_sound.pause();
                        notification_sound.currentTime = 0;
                        notification_sound.play();
                        count ++;
                      }
                    
                      }, 4500);
        
        
        var notificationCallbackOnClose = app.notification.create({
          icon: '<i class="icon f7-icons">person_round</i>',
          title: "A visitor has arrived!",
          titleRightText: 'now',
          subtitle: data.title,
          text: 'Click here to view or approve.',
          closeOnClick: true,
          on: {
            close: function () {
              clearInterval(loop_sound);
              mainView.router.navigate('/arrival/' + data.track_id);
              console.log(data);
                app.methods.updateNotification('id'+data.track_id);
            },
          },
        });
        setTimeout(function() {
        mainView.router.navigate('/notification/');
        },1000);
        notificationCallbackOnClose.open();
      })



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
document.addEventListener('backbutton', function (e) {
  var f7 = app.f7;
  if ($$('.modal-in').length && $$('.modal-in')[0].f7Modal) {
    $$('.modal-in')[0].f7Modal.close();
    return;
  }
  if ($$('.panel-active').length) {
    f7.panel.close();
    return;
  }
  if (app.views.main.router.url == '/' || app.views.main.router.url == '/login/') {
    app.dialog.confirm('Are you sure you want to exit the application?', function () {
      navigator.app.exitApp();
    });


  } else {
    app.views.main.router.back();
  }
  


})
Template7.registerHelper('getUrl', function (val) {
  switch (val) {
    case 'V':
      return '/arrival/';
    case 'A':
      return '/announcement/';
    case 'B':
      return '/bill-details/';
    case 'F':
      return '/family-list/';
  }
});

Template7.registerHelper('entryType', function (val) {
  switch (val) {
    case 'E':
      return 'Single Entry';
    case 'M':
      return 'Multiple Entry';
    case 'S':
      return 'Scheduled Entry';
    case 'W':
      return 'Walk In';
    case 'I':
      return 'Impromptu';
  }
});

Template7.registerHelper('billStatus', function (val) {
  switch (val) {
    case 'P':
      return 'Pending';
    case 'V':
      return 'Void';
    case 'S':
      return 'Fully Paid';
    case 'F':
      return 'Partially Paid';
  }
});
Template7.registerHelper('paymentStatus', function (val) {
  switch (val) {
    case 'P':
      return 'Pending';
    case 'S':
      return 'Validated';
    case 'F':
      return 'Invalid';
  }
});