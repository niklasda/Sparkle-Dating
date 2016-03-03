define(['plugins/router', 'plugins/http', 'knockout', 'durandal/app', 'base64'], function (router, http, ko, app, b64) {
    "use strict";

    return {
        message: ko.observable(),
        //survey: ko.observable(),
        name: ko.observable(),
        postalCode: ko.observable(),
        city: ko.observable(),
        year: ko.observable(),
        isMale: ko.observable(),
        age: ko.observable(),
        note1: ko.observable(),
        imgurl: ko.observable(),
        editable: ko.observable(false),
        newPostalCode: ko.observable(),
        newLookedupCity: ko.observable(),
        newPicture: ko.observable(),

        getCityFromPostalCode: function (postalCode) {
            var city = '';
            if (postalCode) {
                postalCode = postalCode.replace(/\s+/g, '');
                if (postalCode.length === 5) {

                    var result = $.grep(postal, function (code) {
                        return code.pnr === postalCode;
                    });
                    if (result && result.length === 1) {
                        city = result[0].city;
                    }
                }
            }

            return city;
        },
        activate: function () {

            var token = localStorage.getItem("x-sparkle-token");
            var that = this;

            that.editable(false);

            http.get(sparkle.appbaseurl() + "/Mobile/AppSurvey/GetMyShortSurvey", '', { 'x-sparkle-token': token })
                .then(function (response, textStatus) {
                    that.name(response.Survey.Name);
                    that.postalCode(response.Survey.PostalCode);
                    that.city(response.Survey.City);
                    that.year(response.Survey.Year);
                    that.isMale(response.Survey.IsMale);
                    that.age(response.Survey.Age);
                    that.note1(response.Survey.Note1);
                    that.imgurl(sparkle.appbaseurl() + "/Mobile/AppPicture/MainPictureData/?token=" + token);

                    that.newPostalCode.subscribe(function (newPostalCodeValue) {
                        var city = '';
                        if (newPostalCodeValue) {
                            newPostalCodeValue = newPostalCodeValue.replace(/\s+/g, '');
                            if (newPostalCodeValue.length === 5) {
                                city = that.getCityFromPostalCode(newPostalCodeValue);
                            }

                            that.newPostalCode(newPostalCodeValue);
                        }

                        that.newLookedupCity(city);
                    });

                }).fail(function (jqXHR, textStatus, errorThrown) {
                    that.message(textStatus);
                });
        },
        edit: function () {
            this.editable(true);
        },
        save: function () {
            this.editable(false);
        },
        /*uploadImage: function () {
            //var slicedFile = file.slice(10, 30);
           // this.newPicture(file);

                var that = this;
                this.message(that.imgurl());

            var reader = new FileReader();
            reader.onload = function (e) {
                // browser completed reading file - display it

                //alert(that.imgurl());

                //$.base64('encode', e.target.result);

                var pictureDataModel = {
                    fileName: e.target.name,
                    fileType: e.target.type,
                    fileSize: e.target.size,
                    fileData64: $.base64('encode', e.target.result)
                };

                var token = localStorage.getItem("x-sparkle-token");


                http.post(sparkle.appbaseurl() + "/Mobile/AppPicture/UploadPictureData", pictureDataModel, {'x-sparkle-token': token})
                    .then(function (response, textStatus) {
                        //localStorage.setItem("x-sparkle-token", response.Token);
                        that.message(response.Message);
                        //window.location.href = '';
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.responseJSON) {
                            that.message(jqXHR.responseJSON.Message);
                        } else {
                            that.message(textStatus + " / " + errorThrown);
                        }
                    });

            };
            reader.readAsText(that.imgurl());


        },*/
        openCamera: function () {
            var that = this;

            var win = function(r) {
                that.imgurl(r);
                console.log("Code = " + r);
            };

            var fail = function(error) {
                console.log("An error has occurred: " + error);
            };

            navigator.camera.getPicture(win, fail, {
                quality: 30,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.CAMERA, // PHOTOLIBRARY   /  CAMERA
                encodingType: navigator.camera.EncodingType.PNG,
                targetWidth: 800,
                targetHeight: 800,
                correctOrientation: true
            });
        },
        upload: function () {
            var options = new FileUploadOptions();
            options.fileKey = "NewPicture";
            options.fileName = this.imgurl(); //.substr(this.newPicture().name.lastIndexOf('/') +1);

            options.mimeType = "image/png";
            //options.params = params;
            options.chunkedMode = true;

            var token = localStorage.getItem("x-sparkle-token");

            options.headers = {
                Connection: 'close',
                'x-sparkle-token': token
            };

            var win = function (r) {
                console.log("Code = " + r);
            };

            var fail = function (error) {
                console.log("An error has occurred: " + error);
            };

            var ft = new FileTransfer();
            ft.upload(this.imgurl(), sparkle.appbaseurl() + "/Mobile/AppPicture/UploadPictureData2 ", win, fail, options);
        },
        pickFile: function () {
            var that = this;

            var win = function(r) {
                that.imgurl(r);
                console.log("Code = " + r);
            };

            var fail = function(error) {
                console.log("An error has occurred: " + error);
            };
            navigator.camera.getPicture(win, fail, {
                quality: 30,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, // PHOTOLIBRARY   /  CAMERA
                targetWidth: 800,
                targetHeight: 800,
                correctOrientation: true
            });
        }
    };
});