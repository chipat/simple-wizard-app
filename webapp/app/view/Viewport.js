Ext.define('SimpleWizard.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'SimpleWizard.view.MainView'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'mainview'
    }]
});
