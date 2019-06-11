import request from '../js/request.js';

var methods = {
    getUser: function () {
        if (this.form.getFormData('auth')) {
            return this.form.getFormData('auth')
        } else {
            return null;
        }
    },
    getAnnouncements: function () {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('announcements', {
                'Authorization': 'JWT ' + user.token
            }, {
                "page": 1
            },
            function (data) {
                var announcements = data.results;
                f7c.$setState({
                    announcements: announcements,
                });
            },
            function (xhr, status) {
                alert('Opps!');
            });
    },
    getAnnouncement: function () {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('announcements/1', {
                'Authorization': 'JWT ' + user.token
            }, {
                "page": 1
            },
            function (data) {
                var announcements = data;
                console.log(data);
                f7c.$setState({
                    announcements: announcements,
                });
            },
            function (xhr, status) {
                alert('Opps!');
            });
    },
    getProperties: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('residents', {
                'Authorization': 'JWT ' + user.token
            }, {
                "user": user.id,
            },
            function (data) {
                if (data.results[0]) {
                    var properties = data.results[0].lot;
                    f7c.$setState({
                        properties: properties,
                    });
                }
            },
            function (xhr, status) {
                alert('Opps!');
            },
            function (xhr, status) {
                if (complete) {
                    console.log("complete");
                    complete(xhr, status);
                }
            });
    },
    getProperty: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('residents', {
                'Authorization': 'JWT ' + user.token
            }, {
                "user": user.id,
            },
            function (data) {
                if (data.results[0]) {
                    var properties = data.results[0].lot[0];
                    console.log(properties);
                    f7c.$setState({
                        property: properties,
                    });
                }
            },
            function (xhr, status) {
                alert('Opps!');
            },
            function (xhr, status) {
                if (complete) {
                    console.log("complete");
                    complete(xhr, status);
                }
            });
    },
    getVisitors: function (complete) {
        var user = this.methods.getUser();
        var f7c = this.view.current.router.currentPageEl.f7Component;
        if (f7c.users) {
            request.getNext(f7c.next, {
                    'Authorization': 'JWT ' + user.token
                },
                function (data) {
                    var user = f7c.users.concat(data.results);
                    if (data.results) {
                        f7c.$setState({
                            users: user,
                            next: data.next,
                        });
                    }
                },
                function (xhr, status) {
                    alert('Opps!');
                },
                function (xhr, status) {
                    if (complete) {
                        complete(xhr, status);
                    }
                });
        } else {
            request.get('users', {
                    'Authorization': 'JWT ' + user.token
                }, {
                    "page": 1
                },
                function (data) {
                    if (data.results) {
                        f7c.$setState({
                            users: data.results,
                            next: data.next,
                        });
                    }
                },
                function (xhr, status) {
                    app.dialog.alert('Opps!');
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