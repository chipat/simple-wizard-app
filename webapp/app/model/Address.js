/**
 * Created by softpsy on 9/26/14.
 */

Ext.define("SimpleWizard.model.Address",{
    extend: "Ext.data.Model",
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'address'
        }
    },
    fields: [
        {
            name: "id",
            type: "string"
        },
        {
            name: "addressLine1",
            type: "string"
        },
        {
            name: "addressLine2",
            type: "string"
        },
        {
            name:"city",
            type:"string"
        },
        {
            name:"zipcode",
            type:"string"
        },
        {
            name:"state",
            type:"string"
        },
        {
            name:"country",
            type:"string"

        },
        {
            name: "userId",
            type: "string"
        }
    ]
})
