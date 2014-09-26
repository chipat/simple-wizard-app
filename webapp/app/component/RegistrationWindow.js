/**
 * Created by softpsy on 9/26/14.
 */
Ext.define("SimpleWizard.component.RegistrationWindow",{
    extend: "Ext.window.Window",
    requires: [
        'SimpleWizard.component.WizardPanel',
        'SimpleWizard.component.AddressForm',
        'SimpleWizard.component.VehicleForm',
        'SimpleWizard.component.UserDetailsForm'
    ],
    initComponent: function(){

        var me = this;

        Ext.apply(me, {
            items:{
                xtype: "wizardpanel",
                itemId: "wizardPanel",
                minWidth: 500,
                items:[
                    {
                        xtype: "userdetailsform",
                        itemId: "userDetailsForm",
                        wizardTitle: "Enter User Details",
                        bodyPadding: 50
                    },
                    {

                        xtype: "vehicleform",
                        itemId: "vehicleForm",
                        wizardTitle: "Enter Vehicle Details",
                        //grid be default seems to into its container, therefore need to specify height and width
                        height: 300,
                        width: 500
                    },
                    {
                        xtype: "addressform",
                        itemId: "addressForm",
                        wizardTitle: "Enter Address",
                        bodyPadding: 50
                    }
                ],
                listeners: {
                    finish: {
                        fn: me.onVehicleInfoFinish,
                        scope: me
                    },
                    next: {
                        fn: me.noWizardItemShow,
                        scope: me
                    },
                    back: {
                        fn: me.noWizardItemShow,
                        scope: me
                    },
                    start: {
                        fn: me.noWizardItemShow,
                        scope: me
                    }
                }
            }
        });
        me.addEvents(["registrationdata"]);
        me.callParent(arguments);

    },
    loadUserRecord: function(userRecord){

        var me = this, userDetailsForm, vehicleForm, addressForm;
        me.record = userRecord;

        userDetailsForm = me.getWizardItem("userDetailsForm");
        userDetailsForm.getForm().loadRecord(userRecord);
        userDetailsForm.getForm().reset();

        vehicleForm = me.getWizardItem("vehicleForm");
        vehicleForm.setVehicleStore(userRecord.getVehicles());

        addressForm = me.getWizardItem("addressForm");
        addressForm.getForm().loadRecord(userRecord.getAddress());
        addressForm.getForm().reset();

        me.getComponent("wizardPanel").resetWizard();

    },
    getWizardItem: function(itemId){
        var me = this;
        var wizardPanel = me.getComponent("wizardPanel");
        return wizardPanel.getComponent(itemId)
    },
    onVehicleInfoFinish: function(){
        var me = this;
        me.fireEvent("registrationdata",me.record);
    },
    noWizardItemShow: function(activeItem){
        var me = this;
        me.setTitle(activeItem.wizardTitle);
    }
});
