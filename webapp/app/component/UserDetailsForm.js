/**
 * Created by softpsy on 9/26/14.
 */

Ext.define("SimpleWizard.component.UserDetailsForm",{
    extend: "Ext.form.Panel",
    requires: ["SimpleWizard.model.User"],
    xtype: "userdetailsform",

    initComponent: function(){

        var me = this;

        Ext.apply(me,{
            items:[
                {
                    xtype: "textfield",
                    fieldLabel: "First Name"
                },
                {
                    xtype: "textfield",
                    fieldLabel: "Last Name"
                }
            ]
        });

        me.callParent(arguments);
    }
});

