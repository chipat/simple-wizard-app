/**
 * Created by softpsy on 9/26/14.
 */

Ext.define("SimpleWizard.component.AddressForm",{
    extend: "Ext.form.Panel",
    requires: ["SimpleWizard.model.Address"],
    xtype: "addressform",

    initComponent: function(){

        var me = this;

        Ext.apply(me,{
            items:[
                {
                    xtype: "textfield",
                    fieldLabel: "Address Line 1"
                },
                {
                    xtype: "textfield",
                    fieldLabel: "Address Line 2"
                },
                {
                    xtype: "textfield",
                    fieldLabel: "City"
                },
                {
                    xtype: "textfield",
                    fieldLabel: "State"
                },
                {
                    xtype: "textfield",
                    fieldLabel: "Zip Code"
                },
                {
                    type: "textfield",
                    fieldLabel: "Country"
                }
            ]
        });

        me.callParent(arguments);
    }
});
