var pnr = [
    {}
];

var brilliance = {

    appbaseurl: function () {
        "use strict";
        var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;

        if (!app && document.URL.indexOf("localhost") > -1) {
            return "http://localhost:45562/";
        } else {
            return "https://sparkle-dating.azurewebsites.net/";
        }
    },

    handleErrors: function (jqXHR, textStatus, errorThrown) {
        "use strict";
        if (jqXHR.status === 403) {
            window.location.href = '#login';
        }
    },

    signup1: {},
    signup2: {},
    signup3: {},
    searchPostalCode: ""
};
