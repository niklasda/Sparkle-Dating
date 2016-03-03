define(['plugins/router', 'plugins/http', 'knockout', 'durandal/app'], function (router, http, ko, app) {
    "use strict";

    return {
        name: ko.observable(),
        heads: ko.observableArray(),
        buildUrl: function (id) {
            var token = localStorage.getItem("x-sparkle-token");
            return sparkle.appbaseurl() + "/Mobile/AppPicture/MainPictureDataFor/" + id + "?token=" + token;
        },
        rowClick: function (row) {
            window.location.href = '#conversation/' + row.OtherSurveyId;
        },
        activate: function () {

            var token = localStorage.getItem("x-sparkle-token");
            var that = this;

            http.get(sparkle.appbaseurl() + "/Mobile/AppContactivity/GetConversationHeads", '', { 'x-sparkle-token': token })
                .then(function (response, textStatus) {
                    that.heads(response.Heads);
                }).fail(sparkle.handleErrors);
        }

        //http.remove(sparkle.appbaseurl() + "/Mobile/AppContactivity/DeleteFavourite", data, { 'x-sparkle-token': token })
        //    .then(function (response, textStatus) {
        //       that.newMessageBody(response.Message);
        //        //that.otherSurveyName(response.Conversation.OtherSurveyName);

        //    }).fail(sparkle.handleErrors);
    };
});