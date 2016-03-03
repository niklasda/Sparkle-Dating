define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    "use strict";

    return {
        message: ko.observable(),
        activate: function (action) {
             
            var token = localStorage.getItem("x-sparkle-token");
            var that = this;

            if (action === "logout") {
                http.post(sparkle.appbaseurl() + "/Mobile/AppAccount/Logout", '', { 'x-sparkle-token': token })
                    .then(function (response, textStatus) {
                        that.message(response.Message);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that.message(textStatus);
                    }).always(function () {

                    });

                localStorage.removeItem("x-sparkle-token");
                window.location.href = '#home';
                window.location.reload(true);
            } else if (action === "deactivate") {
            } else if (action === "remove") {
            }
        }
    };
});

