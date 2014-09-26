Ext.define('SimpleWizard.controller.MainController', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'mainView',
        selector: 'mainview'
    }],

    init: function() {

        var me = this;

        me.control({
            'mainview': {
                registrationdata: {
                    fn: me.onVehicleInfoComplete,
                    scope: me
                }
            }
        });
    },
    onStartWizard: function(){
        var me = this;
        me.getMainView().launchWizard();
    },
    onVehicleInfoComplete: function(userRecord){
        var me = this;

        //record save does not save its associations
        userRecord.save({
            callback: function(userRecord, operation, success){
                if(success){
                    me.saveUserVehicles(userRecord);
                } else {
                    me.onDataSaveError([operation]);
                }
            }
        });
    },
    saveUserVehicles: function(userRecord){
        var me = this;

        userRecord.getVehicles().sync({
            success: function(){
                me.saveUserAddress(userRecord);
            },
            failure: function(batch, options){
                me.onDataSaveError(batch.exceptions);
            }
        });

    },
    saveUserAddress: function(userRecord){
        var me = this;

        userRecord.getAddress().save({
            callback: function(addressRecords, operation, success){
                if(success){
                    me.onSaveSuccess(addressRecords[0]);
                } else {
                    me.onDataSaveError([operation]);
                }
            }
        });

    },
    onSaveSuccess: function(){
        Ext.MessageBox.show({
            title: 'Registration Complete',
            msg: 'Registration has been completed',
            width:300,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
    },

    onDataSaveError: function(failedOperations){
        var messages = "", me = this;

        Ext.Array.each(failedOperations, function(operation, index, all){

            var exception = operation.getException();
            if(Ext.isString(exception)){
                messages+= exception+"</br>";
            } else if(Ext.isString(exception.statusText)){
                messages += exception.statusText+"</br>"
            } else {
                messages += 'Unknown error </br>';
            }

        });

        me.showErrorMessages(messages);
    },
    showErrorMessages: function(messages){
        //display error message in a messagebox or other mechanism.
        Ext.MessageBox.show({
            title: 'Registration Failed',
            msg: messages,
            width:300,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }

});
