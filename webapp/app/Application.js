Ext.define('SimpleWizard.Application', {
    name: 'SimpleWizard',

    extend: 'Ext.app.Application',

    views: [
        "SimpleWizard.view.MainView"
    ],

    controllers: [
        "SimpleWizard.controller.MainController"
    ],

    stores: [
        // TODO: add stores here
    ]
});
