define(['plugins/router', 'plugins/http', 'durandal/app', 'knockout', 'knockout-validation'], function (router, http, app, ko, koval) {
    "use strict";

    return {
        username: ko.observable("").extend({
            required: {params: true, message: 'användarnamn måste anges'},
            minLength: {params: 5, message: 'användarnamn måste vara minst {0} tecken'}
        }),
        password: ko.observable("").extend({
            required: {params: true, message: 'lösenord måste anges'},
            minLength: {params: 6, message: 'lösenord måste vara minst {0} tecken'}
        }),
        email: ko.observable("").extend({
            required: {params: true, message: 'måste ange giltig e-post'},
            minLength: {params: 5, message: 'måste ange giltig e-post'},
            email: {params: true, message: 'måste ange giltig e-post'}
        }),
        termsAccepted: ko.observable(false),

        message: ko.observable(""),
        activate: function () {
        },
        onBackClick: function () {
            return true;
        },
        onClick: function () {

            var result = ko.validation.group(this, {deep: false});
            var valid = result().length === 0;

            if (!this.termsAccepted()) {
                if (valid) {
                    app.showMessage('Du måste godkänna villkoren.');
                    return false;
                }
            }

            if (valid) {
                var data = {
                    username: this.username(),
                    password: this.password(),
                    email: this.email()
                };

                sparkle.signup3 = data;

                var allData = {
                    amMan: sparkle.signup1.amMan,
                    amWoman: sparkle.signup1.amWoman,
                    wantMan: sparkle.signup1.wantMan,
                    wantWoman: sparkle.signup1.wantWoman,

                    country: sparkle.signup2.country,
                    postalCode: sparkle.signup2.postalCode,
                    birthYear: sparkle.signup2.birthYear,

                    username: sparkle.signup3.username,
                    password: sparkle.signup3.password,
                    email: sparkle.signup3.email
                };
                var that = this;

                http.post(sparkle.appbaseurl() + "/Mobile/AppAccount/SignupSubmit", allData, '')
                    .then(function (response, textStatus) {
                        
                        that.message(response.Message);
                        window.location.href = '#signup4';
                       // return true;
                        //                  window.location.href = '';
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that.message(jqXHR.responseJSON.Message);
                      //  return false;
                    });

            } else {
               // app.showMessage(result());
                result.showAllMessages();
                return false;
            }
        }
    };
});



