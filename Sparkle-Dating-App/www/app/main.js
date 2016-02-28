requirejs.config({
    paths: {
        'text': '../scripts/text',
        'durandal': '../scripts/durandal',
        'plugins': '../scripts/durandal/plugins',
        'transitions': '../scripts/durandal/transitions',
        'knockout': '../scripts/knockout-3.4.0',
        'knockout-validation': '../scripts/knockout.validation',
        'bootstrap': '../scripts/bootstrap',
        'jquery': '../scripts/jquery-2.2.1',
        'base64': '../scripts/jquery.base64',
        'jqui': '../scripts/jquery-ui-1.11.4',
        'slick': '../scripts/slick/slick'
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'], function (system, app, viewLocator) {
    "use strict";

    system.debug(true);

    app.title = 'Sparkle';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function () {
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell');
    });
});