﻿define(['plugins/router', 'plugins/http', 'knockout'], function (router, http, ko) {
    "use strict";

    return {
        errorMessage: ko.observable(),
        survey: ko.observable(),
        imgurl: ko.observable(),
        activate: function (id) {

            var token = localStorage.getItem("x-sparkle-token");
            var that = this;

            http.get(sparkle.appbaseurl() + "/Mobile/AppSurvey/GetShortSurvey", 'id=' + id, { 'x-sparkle-token': token })
                .then(function (response, textStatus) {
                    that.survey(response.Survey);
                    that.imgurl(sparkle.appbaseurl() + "/Mobile/AppPicture/MainPictureDataFor/" + id + "?token=" + token);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    that.errorMessage(textStatus);
                });
        }
    };
});