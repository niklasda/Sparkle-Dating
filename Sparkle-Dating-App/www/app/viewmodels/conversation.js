﻿define(['plugins/router', 'plugins/http', 'knockout', 'durandal/app'], function (router, http, ko, app) {
    "use strict";

    return {
        messages: ko.observableArray(),
        otherSurveyId: ko.observable(),
        otherSurveyName: ko.observable(),
        newMessageBody: ko.observable(),
        onBackClick: function () {
            return true;
        },
        onSendNewMessage: function (messageModel) {

            if (messageModel == undefined) {
                return;
            }

            var token = localStorage.getItem("x-sparkle-token");
            var that = this;

            var data = {
                OtherSurveyId: this.otherSurveyId,
                NewMessageBody: this.newMessageBody
            };

            http.put(sparkle.appbaseurl() + "/Mobile/AppContactivity/PutNewMessage", data, { 'x-sparkle-token': token })
                .then(function (response, textStatus) {
                    that.newMessageBody('');
                    that.messages.push(response.AddedMessage);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status === 400) {
                        app.showMessage('Failed to send message!', 'Brilliance');
                    } else {
                        sparkle.handleErrors(jqXHR, textStatus, errorThrown);
                    }
                });
        },
        checkMessages: function (messageId) {
            "use strict";

            var token = localStorage.getItem("x-sparkle-token");
            var that = this;

            var lastId = 0;
            if (that.messages().length > 0) {
                lastId = that.messages()[that.messages().length - 1].MessageId;
            }

            var data = {
                OtherSurveyId: this.otherSurveyId,
                LastMessageId: lastId
            };

            http.get(sparkle.appbaseurl() + "/Mobile/AppContactivity/GetNewMessages", data, { 'x-sparkle-token': token })
                .then(function (response, textStatus) {
                    var i;
                    for (i = 0; i < response.Conversation.Messages.length; i += 1) {
                        that.messages.push(response.Conversation.Messages[i]);
                    }

                    if (response.Conversation.Messages.length > 0) {
                        //that.messages.push(response.Conversation.Messages[0]);
                        $('#newMessage').focus();
                    }

                    //setTimeout(function () {
                    //    that.checkMessages(messageId);
                    //}, 5000);
                });
        },
        compositionComplete: function () {
            $('#postNewMessage').focus();
            $('#newMessage').focus();

            var that = this;

            setTimeout(function () {
                that.checkMessages(1, 1);
            }, 5000);
        },

        activate: function (id) {

            this.otherSurveyId = id;
            var token = localStorage.getItem("x-sparkle-token");
            var that = this;

            http.get(sparkle.appbaseurl() + "/Mobile/AppContactivity/GetConversation", 'id=' + id, { 'x-sparkle-token': token })
                .then(function (response, textStatus) {
                    that.messages(response.Conversation.Messages);
                    that.otherSurveyName(response.Conversation.OtherSurveyName);

                }).fail(sparkle.handleErrors);
        }
    };
});