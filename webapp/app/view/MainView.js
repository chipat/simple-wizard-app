Ext.define('SimpleWizard.view.MainView', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'mainview',

    layout: {
        type: 'border'
    },

    initComponent: function(){
        var me = this;
        Ext.apply(me, {
            items: [
                {
                    region: 'center',
                    xtype: 'container',
                    itemId:"centercontainer",
                    layout:{
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items:[
                        {
                            xtype: 'button',
                            scale: 'large',
                            action: 'starwizard',
                            itemId: 'startBtn',
                            text: "Let's Start",
                            handler: me.onStartBtn,
                            scope: me
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);

        me.on({
            destroy: {
                fn: me.onMainViewDestroy,
                scope: me
            }
        })
    },
    onStartBtn: function(){

        var me = this, user;
        //launch wizard
        user = me.createNewUser();

        if(!Ext.isDefined(me.wizardWindow)){

            me.wizardWindow = Ext.create("SimpleWizard.component.RegistrationWindow",{

                listeners: {
                    registrationdata: {
                        fn: me.onRegistrationData,
                        scope: me
                    }
                }
            });
        }

        me.wizardWindow.loadUserRecord(user);

        me.currentUser = user;

        me.wizardWindow.show();
    },
    onRegistrationData: function(userRecord){
        var me = this;
        me.wizardWindow.close();
        me.fireEvent("registrationdata",userRecord);

    },
    onMainViewDestroy: function(){
        var me = this;
        if(Ext.isDefined(me.wizardWindow)){
            me.wizardWindow.destroy();
        }
    },
    createNewUser: function(){
        var me = this, user;
        user = Ext.create("SimpleWizard.model.User");
        user.setAddress(Ext.create("SimpleWizard.model.Address"));
        user.getVehicles().add("SimpleWizard.model.Vehicle");
        return user;
    }

});