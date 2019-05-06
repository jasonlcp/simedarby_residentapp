import request from '../js/request.js';

var methods = {
    getAnnouncements: function () {
        var self = this;
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('announcements', {
                'Authorization': 'JWT ' + self.data.user.token
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
                app.dialog.alert('Opps!');
            });
    },
    getProperties: function (complete) {
        var self = this;
        var f7c = this.view.current.router.currentPageEl.f7Component;
        request.get('residents', {
                'Authorization': 'JWT ' + self.data.user.token
            }, {
                "user": self.data.user.user.id,
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
                app.dialog.alert('Opps!');
            },
            function (xhr, status) {
                if (complete) {
                    complete(xhr, status);
                }
            });
    },
    getVisitors: function (complete) {
        var self = this;
        var f7c = this.view.current.router.currentPageEl.f7Component;
        if (f7c.users) {
            request.getNext(f7c.next, {
                    'Authorization': 'JWT ' + self.data.user.token
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
                    app.dialog.alert('Opps!');
                },
                function (xhr, status) {
                    if (complete) {
                        complete(xhr, status);
                    }
                });
        } else {
            request.get('users', {
                    'Authorization': 'JWT ' + self.data.user.token
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