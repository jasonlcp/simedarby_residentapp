import request from '../js/request.js';

var methods = {
    getUser: function () {
        
        if (this.form.getFormData('auth')) {
            return this.form.getFormData('auth')
        } else {
            return null;
        }
        
    },
    locked:function(){
        this.dialog.alert('I\'m sorry your property is currently locked.', 'Property Locked.');
    },
    getCommunity:function(){
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('property/getcommunity', null, null,
            function (data) {
                f7c.$setState({
                    community: data,
                });
            },
            function (xhr, status) {
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }

            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    getArea:function(id){
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('property/getarea', null, {'id':id},
            function (data) {
                f7c.$setState({
                    area: data,
                });
            },
            function (xhr, status) {
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }else{
                    f7c.$setState({
                        area: null,
                    });
                }

            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    getStreet:function(id){
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('property/getstreet', null, {'id':id},
            function (data) {
                f7c.$setState({
                    street: data,
                });
            },
            function (xhr, status) {
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }else{
                    f7c.$setState({
                        street: null,
                    });
                }

            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    getLot:function(id){
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('property/getlot', null, {'id':id},
            function (data) {
                f7c.$setState({
                    lot: data,
                });
            },
            function (xhr, status) {
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }else{
                    f7c.$setState({
                        lot: null,
                    });
                }

            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    postRegister:function(data){
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        
        request.post('resident_request', null, data,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                app.dialog.alert("successfully registered your account.", "Success!",function(){
                 

                });
                f7c.$router.back("/login/", {
                    force: true
                });
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status == 400) {
                    var response = JSON.parse(xhr.response);
                    console.log(response);
                    f7c.$$("div[for]").html('');
                    for (var res in response) {
                        console.log(response[res]);
                        f7c.$$("div[for=" + res + "]").html(response[res].toString().split(',').join("<br />"));
                    }
                  
    
                } else {
                    //alert(response);
                    //alert(JSON.stringify(xhr));
                    //alert(status);
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection")
                    app.dialog.alert("Please try again.", "Register Process Failed");
                   
             
                }
            },
            function (xhr, status) {
                if (xhr.status == 200) {
                    f7c.$router.back("/login/", {
                        force: true
                    });
                }
            });
    },
    deletefamily:function(resident,lot){
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.post('resident/removeLot', {
                'Authorization': 'JWT ' + user.token
            }, {"user_id":resident,"lot_id":lot},
            function () {},
            function (xhr, status) {
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                    app.dialog.alert("Please try again.", "Delete Family Process Failed");
                }
            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    getNotificationCount: function () {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('notification/count', {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                f7c.$setState({
                    notificationCount: data.count,
                });
            },
            function (xhr, status) {
                console.log(xhr)
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }else{
                    f7c.$setState({
                        notificationCount: null,
                    });
                }

            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    getNotification: function () {
        this.dialog.preloader();
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        request.get('notification', {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                console.log(data)
                f7c.$setState({
                    notification: data,
                });
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    var dialog1 = app.dialog.create({
                        title: 'Sorry to have you waiting.',
                        text: '<div>We currently facing high traffic on billing-related action.<br><br>Please try again !<br>Thank you for your patience :) </div>',
                        buttons: [
                        // {
                        //     text: 'RETRY NOW',
                        //     onClick: function () {
                        //         clearInterval(myTimer);
                        //         router.refreshPage('/');
                                
                        //     }
                        // },
                        {
                            text: 'Close',
                            onClick: function () {
                                f7c.$router.refreshPage('/');
                                app.dialog.close()
                            }
                        }
                        ]
                    })
    
                    dialog1.open();
                }
            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    updateNotification: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.put('notification/' + id, {
                'Authorization': 'JWT ' + user.token
            }, {
                'is_read': true
            },
            function () {},
            function (xhr, status) {
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                    app.dialog.alert("Please try again.", "Update Process Failed");
                }
            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    deleteNotification: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.destroy('notification/' + id, {
                'Authorization': 'JWT ' + user.token
            }, null,
            function () {},
            function (xhr, status) {
                if (xhr.status != 404) {
                    app.dialog.alert("Please try again.", "Delete Notification Process Failed");
                }
            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    deleteAllNotification: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.destroy('notification/destroyAll', {
                'Authorization': 'JWT ' + user.token
            }, null,
            function () {},
            function (xhr, status) {
                if (xhr.status != 404) {
                    app.dialog.alert("Please try again.", "Delete Notification Process Failed");
                    
                }
            },
            function (xhr, status) {
                //complete(xhr, status);
            });
    },
    getUserLot: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('resident', {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (data.lot) {
                    return data.lot;
                }
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
            
                }
            },
            function (xhr, status) {
                complete(xhr, status);
            });
    },
    updateDefaultLot: function (id, lot, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('resident/' + id, {
                'Authorization': 'JWT ' + user.token
            }, {
                'default_lot': lot,
            },
            function (data) {},
            function (xhr, status) {
                if (xhr.status != 404) {
                    app.dialog.alert("Please try again.", "Update Process Failed");
                }
            },
            function (xhr, status) {
                complete(xhr, status);
            });
    },
    forgotPassword: function (data, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.post('forgot', null, data,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                app.dialog.alert("We just send an email containing a password reset link to your email.", "Check your email.");
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                app.dialog.alert("Please Make Sure You’re Enter a Valid Email Address before Proceed to Reset Your Password.", "Email Doesn’t Exist! ");
            },
            function (xhr, status) {
                if (xhr.status == 200) {
                    f7c.$router.back("/login/", {
                        force: true
                    });
                }
            });
    },

    submitFeedback: function (data, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.post('feedback', null, data,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                app.dialog.alert(" Our support team will get back to you soon !\nOur office hour is Mon - Fri, 9am - 6pm (Excluding Public Holiday) !","Thanks for your Feedback !");
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                app.dialog.alert("Please try again.", "Submit Process Failed");
            },
            function (xhr, status) {
                if (xhr.status == 200) {
                     f7c.$router.back("/", {
                        force: true
                    });
                }
            });
    },
    resetPassword: function (data, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.post('change_password', {
                'Authorization': 'JWT ' + user.token
            }, data,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                app.dialog.alert("successfully change password.", "Success!");
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status == 400) {
                    var response = JSON.parse(xhr.response);
                    console.log(response);
                    f7c.$$("div[for]").html('');
                    for (var res in response) {
                        console.log(response[res]);
                        f7c.$$("div[for=" + res + "]").html(response[res].toString().split(',').join("<br />"));
                    }
    
                } else {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection")
                    app.dialog.alert("Please try again.", "Reset Password Process Failed");
                }
            },
            function (xhr, status) {
                if (xhr.status == 200) {
                    f7c.$router.back("/", {
                        force: true
                    });
                }
            });
    },
    getTrack: function (id, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('visitor_entry/' + id, {
                'Authorization': 'JWT ' + user.token
            }, {
                "page": 1
            },
            function (data) {
                var visitor = data;
                setTimeout(function(){ app.dialog.close(); }, 300);
                f7c.$setState({
                    visitor: visitor,
                });
                return data;
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }
            },
            function (xhr, status) {
                complete(xhr, status);
            });
    },
    updateStatus: function (id, val, complete) {
        var user = this.methods.getUser();
        this.dialog.preloader();
        var app = this;
        request.put('visitor_entry/' + id, {
                'Authorization': 'JWT ' + user.token
            }, {
                "status": val
            },
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                complete(xhr, status);
            });
    },
    getAnnouncements: function (limit, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        if (!limit) {
            limit = 0;
        }
        var app = this;
        // this.dialog.preloader();
        request.get('announcements', {
                'Authorization': 'JWT ' + user.token
            }, {
                "page": 1,
                "limits": limit,
            },
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
                var announcements = data.results;
                f7c.$setState({
                    announcements: announcements,
                });
            },
            function (xhr, status) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {

                }
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    getAnnouncement: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('announcements/' + id, {
                'Authorization': 'JWT ' + user.token
            }, {
                "page": 1
            },
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                var announcements = data;
                console.log(data);
                if(data.body == null){
                var dialog1 = app.dialog.create({
                    title: 'Deleted',
                    text: 'The Announcement has been deleted !',
                    buttons: [
                      {
                        text: 'Close',
                        onClick: function () {
                            // clearInterval(myTimer);
                            app.dialog.close()
                        }
                      }
                    ]
                  })

                  dialog1.open()
                }
                f7c.$setState({
                    announcements: announcements,
                    
                });
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                console.log(status)
                if(xhr.status != 404){
                    var dialog1 = app.dialog.create({
                        title: 'Sorry to have you waiting.',
                        text: '<div>We currently facing high traffic on billing-related action.<br><br>Please try again !<br>Thank you for your patience :) </div>',
                        buttons: [
                      
                        
                        {
                            text: 'Close',
                            onClick: function () {
                                f7c.$router.refreshPage('/');
                                app.dialog.close()
                            }
                        }
                        ]
                    })
    
                    dialog1.open();
                }
                if (status == 404) {
                    var dialog1 = app.dialog.create({
                        title: 'Not Found !',
                        text: 'The Announcement has been deleted !',
                        buttons: [
                          {
                            text: 'Close',
                            onClick: function () {
                                // clearInterval(myTimer);
                                // 
                                f7c.$router.navigate('/')
                                f7c.$router.clearHistory();
                            }
                          }
                        ]
                      })
    
                      dialog1.open()
                }
            });
    },
    
    getProperties: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        //this.dialog.preloader();
        request.get('resident', {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
                if (data.lot) {
                    var properties = data.lot;
                    f7c.$setState({
                        properties: properties,
                        is_lock_down: data.is_lock_down,
                    });
                }
            },
            function (xhr, status) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
                console.log(xhr)
                if (xhr.status != 404) {
                 
                
                }
            },
            function (xhr, status) {
                
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    getProperty: function (id, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('resident', {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (data) {
                    var properties = data.lot[id];
                    f7c.$setState({
                        property: properties,
                    });
                }
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
               
                }
            },
            function (xhr, status) {
                if (complete) {
                    console.log("complete");
                    complete(xhr, status);
                }
            });
    },
    postFamilyRequest: function (data) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.post('request_family', {
            'Authorization': 'JWT ' + user.token
        }, data, function (data) {
            //redirect
            setTimeout(function(){ app.dialog.close(); }, 300);
            app.dialog.alert("Your request has been successfully submitted.", "Success!",function(){
                f7c.$router.back();
            });
          
            console.log(data);
        }, function (xhr, status) {
            setTimeout(function(){ app.dialog.close(); }, 300);
            if (xhr.status == 400) {
                var response = JSON.parse(xhr.response);
                console.log(response);
                f7c.$$("div[for]").html('');
                for (var res in response) {
                    f7c.$$("div[for=" + res + "]").html(response[res]);
                }

            } else {
                // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                app.dialog.alert("Please try again.", "Submit Family Request Process Failed");
            }

        }, function (xhr, status) {})
    },
    postEntry: function (data) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.post('entry_schedule', {
            'Authorization': 'JWT ' + user.token
        }, data, function (data) {
            //redirect
            setTimeout(function(){ app.dialog.close(); }, 300);
            f7c.$router.navigate("/qr/" + data.id+'/1');
            console.log(data);
        }, function (xhr, status) {
            setTimeout(function(){ app.dialog.close(); }, 300);
            if (xhr.status == 400) {
                var response = JSON.parse(xhr.response);
                f7c.$$("div[for]").html('');
                for (var res in response) {
                    f7c.$$("div[for=" + res + "]").html(response[res]);
                }

            } else {
                // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                app.dialog.alert("Please try again.", "Submit Entry Process Failed");
            }

        }, function (xhr, status) {})
    },
    getEntriesSingle: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        var app = this;
        this.dialog.preloader();
        request.get('entry_schedule', {
                'Authorization': 'JWT ' + user.token
            }, {
                'entry_type': 'E',
                'start_date': today,
            },
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                f7c.$setState({
                    single: data.results,
                });

            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
             
                }
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    getEntriesMultiple: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        request.get('entry_schedule', {
                'Authorization': 'JWT ' + user.token
            }, {
                'entry_type': 'M',
                'start_date': today,
            },
            function (data) {
                f7c.$setState({
                    multiple: data.results,
                });

            },
            function (xhr, status) {
                if (xhr.status != 404) {
                 
                }
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    getEntriesSchedule: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        request.get('entry_schedule', {
                'Authorization': 'JWT ' + user.token
            }, {
                'entry_type': 'S',
                'start_date': today,
            },
            function (data) {
                f7c.$setState({
                    schedule: data.results,
                });

            },
            function (xhr, status) {
                if (xhr.status != 404) {

                }
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    deleteEntry: function (id) {
        var user = this.methods.getUser();
        var app = this;
        request.destroy('entry_schedule/' + id, {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
            },
            function (xhr, status) {
                if (xhr.status != 404) {
                    app.dialog.alert("Please try again.", "Delete Entry Process Failed");
                   
                }
            },
            function (xhr, status) {

            });
    },
    getEntriesUpcoming: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        var app = this;
        this.dialog.preloader();
        request.get('entry_schedule', {
                'Authorization': 'JWT ' + user.token
            }, {
                'start_date': today,
            },
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                f7c.$setState({
                    upcoming: data.results,
                });

            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
         
                }
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    updateStatusV: function (id, val, complete) {
        var user = this.methods.getUser();
        this.dialog.preloader();
        var app = this;
        request.put('entry_schedule/' + id, {
                'Authorization': 'JWT ' + user.token
            }, {
                "is_active": val
            },
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    app.dialog.alert("Please try again.", "Update Process Failed");
                }
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                complete(xhr, status);
            }
        );
    },
    getEntry: function (id, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('entry_schedule/' + id, {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                console.log(data);
                f7c.$setState({
                    entry: data,
                });

            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                  
                }
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    postVisitors: function (data) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.post('visitors', {
            'Authorization': 'JWT ' + user.token
        }, data, function () {
            setTimeout(function(){ app.dialog.close(); }, 300);
          
        }, function (xhr, status) {
            setTimeout(function(){ app.dialog.close(); }, 300);
            if (xhr.status == 400) {
                var response = JSON.parse(xhr.response);
                f7c.$$(".item-input-error-message").html('');
                for (var res in response) {
                    f7c.$$("div[for=" + res + "]").html(response[res]);
                }

            } else {
                app.dialog.alert("Please try again.", "Submit Visitors Process Failed");
            }

        }, function (xhr, status) {
            if (xhr.status == 201) {
                var router = f7c.$router;
                app.dialog.alert("successfully added new visitor.", "Success!",function(){
                    router.back("/visitor-list/2", {
                        force: true
                    });
                });
           
            }
        })
    },
    updateVisitor: function (id, data, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        request.put('visitors/'+id, {
            'Authorization': 'JWT ' + user.token
        }, data, function () {
    
        }, function (xhr, status) {
            if (xhr.status == 400) {
                var response = JSON.parse(xhr.response);
                f7c.$$("div[for]").html('');
                for (var res in response) {
                    f7c.$$("div[for=" + res + "]").html(response[res]);
                }
                
            } else {
            //     app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
            app.dialog.alert("Please try again.", "Update Process Failed");
            }

        }, function (xhr, status) {
            if (xhr.status == 200) {
                if (complete) {
                    complete(xhr, status);
                }
            }
        })
    },
    postDefaultLot: function (val) {
        var user = this.methods.getUser();
        var app = this;
        request.post('resident/defaultProperty', {
                'Authorization': 'JWT ' + user.token
            }, val,
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
            },
            function (xhr, status) {},
            function (xhr, status) {});
    },
    postDisNotification: function (val) {
        var user = this.methods.getUser();
        var app = this;
        request.post('resident/disableNotification', {
                'Authorization': 'JWT ' + user.token
            }, val,
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
            },
            function (xhr, status) {},
            function (xhr, status) {});
    },
    postOrderFamily: function (val) {
        var user = this.methods.getUser();
        var app = this;
        request.post('resident/orderFamily', {
                'Authorization': 'JWT ' + user.token
            }, val,
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
            },
            function (xhr, status) {},
            function (xhr, status) {});
    },
    deleteVisitor: function (id) {
        var user = this.methods.getUser();
        var app = this;
        request.destroy('visitors/' + id, {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                //setTimeout(function(){ app.dialog.close(); }, 300);
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                    app.dialog.alert("Please try again.", "Delete Visitor Process Failed");
                }
            },
            function (xhr, status) {

            });
    },
    getVisitor: function (id, complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('visitors/' + id, {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                f7c.$setState({
                    visitor: data,
                });

            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    
                }
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    getBills: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        this.dialog.preloader();
        var app = this;
        request.get('billing', {
                'Authorization': 'JWT ' + user.token
            }, {
                "lot": id,
                "finish": 1,
            },
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                console.log(data)
                f7c.$setState({
                    bill: data,
                });

            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    var dialog1 = app.dialog.create({
                        title: 'Sorry to have you waiting.',
                        text: '<div>We currently facing high traffic on billing-related action.<br><br>Please try again !<br>Thank you for your patience :) </div>',
                        buttons: [
                        // {
                        //     text: 'RETRY NOW',
                        //     onClick: function () {
                        //         clearInterval(myTimer);
                        //         router.refreshPage('/');
                                
                        //     }
                        // },
                        {
                            text: 'Close',
                            onClick: function () {
                                f7c.$router.refreshPage('/');
                                app.dialog.close()
                            }
                        }
                        ]
                    })
    
                    dialog1.open();
                }
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
            });
    },
    getBillLimits: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        request.get('billing', {
                'Authorization': 'JWT ' + user.token
            }, {
                "lot": id,
                "finish": 1,
                "limits":2,
            },
            function (data) {
                f7c.$setState({
                    bill: data,
                });

            },
            function (xhr, status) {
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                }
            },
            function (xhr, status) {
            });
    },
    postPayment: function (val) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        this.dialog.preloader();
        var app = this;
        request.postMultipart('billing/pay', {
                'Authorization': 'JWT ' + user.token
            },val,
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                app.dialog.alert("Your payment has been made.", "Thank You!");
            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
                    // app.dialog.alert("This application requires internet connection. Check your connection and try again.", "No Internet Connection");
                     app.dialog.alert("Please try again.", "Payment Process Failed");
                }
            },
            function (xhr, status) {
                if (xhr.status == 201) {
                    f7c.$router.back("/", {
                        force: true
                    });
                }
            });
    },
    getBillPartially: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('billing', {
                'Authorization': 'JWT ' + user.token
            }, {
                "lot": id,
                "status": 'F',
            },
            function (data) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                console.log(data);
                f7c.$setState({
                    partially: data,
                });

            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
             
                }
            },
            function (xhr, status) {});
    },
    getBillPaid: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('billing', {
                'Authorization': 'JWT ' + user.token
            }, {
                "lot": id,
                "status": 'S',
            },
            function (data) {
                console.log(data);
                f7c.$setState({
                    paid: data,
                });

            },
            function (xhr, status) {
                if (xhr.status != 404) {

                }
            },
            function (xhr, status) {});
    },
    getBillPending: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('billing', {
                'Authorization': 'JWT ' + user.token
            }, {
                "lot": id,
                "status": 'P',
            },
            function (data) {
                console.log(data);
                f7c.$setState({
                    pending: data,
                });

            },
            function (xhr, status) {
                if (xhr.status != 404) {

                }
            },
            function (xhr, status) {});
    },
    getBill: function (id) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        request.get('billing/' + id, {
                'Authorization': 'JWT ' + user.token
            }, null,
            function (data) {
                console.log(data);
                setTimeout(function(){ app.dialog.close(); }, 300);
                f7c.$setState({
                    bill: data,
                });

            },
            function (xhr, status) {
                setTimeout(function(){ app.dialog.close(); }, 300);
                if (xhr.status != 404) {
  
                }
            },
            function (xhr, status) {});
    },
    
    
    getVisitors: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        var app = this;
        this.dialog.preloader();
        if (f7c.users) {
            request.getNext(f7c.next, {
                    'Authorization': 'JWT ' + user.token
                },
                function (data) {
                    setTimeout(function(){ app.dialog.close(); }, 300);
                    if (data.results) {
                        var user = f7c.users.concat(data.results);
                        f7c.$setState({
                            users: user,
                            next: data.next,
                        });
                    } else {
                        f7c.$setState({
                            users: data,
                            next: data.next,
                        });
                    }
                },
                function (xhr, status) {
                    setTimeout(function(){ app.dialog.close(); }, 300);
                    if (xhr.status != 404) {
                     
                    }
                },
                function (xhr, status) {
                    if (complete) {
                        complete(xhr, status);
                    }
                });
        } else {
            request.get('visitors', {
                    'Authorization': 'JWT ' + user.token
                },null,
                function (data) {
                    setTimeout(function(){ app.dialog.close(); }, 300);
                    if (data.results) {
                        f7c.$setState({
                            users: data.results,
                            next: data.next,
                        });
                    } else {
                        f7c.$setState({
                            users: data,
                            next: data.next,
                        });
                    }
                },
                function (xhr, status) {
                    setTimeout(function(){ app.dialog.close(); }, 300);
                    if (xhr.status != 404) {

                    }

                    if(status == 404){
                        app.dialog.alert("You don't have any vistors.", "Not Found !");
                    }
                },
                function (xhr, status) {
                    if (complete) {
                        complete(xhr, status);
                    }
                }
            );
        }
    }
}
export default methods;