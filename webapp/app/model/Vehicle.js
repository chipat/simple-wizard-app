/**
 * Created by softpsy on 9/25/14.
 */
Ext.define("SimpleWizard.model.Vehicle",{
    extend: "Ext.data.Model",
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'vehicles'
        }
    },
    fields:[
        {
            name: "id",
            type: "string"
        },
        {
            name: "model",
            type: "string"
        },
        {
            name: "userId",
            type: "string"
        },
        {
            name: "make",
            type: "string"
        },
        {
            name:"year",
            type:"int"
        }
    ]
});