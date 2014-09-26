/**
 * Created by softpsy on 9/25/14.
 */

/**
 * Created by softpsy on 9/25/14.
 */
Ext.define("SimpleWizard.model.User",{
    extend:"Ext.data.Model",
    requires:[
        "SimpleWizard.model.Vehicle",
        "SimpleWizard.model.Address"
    ],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'users'
        }
    },
    fields:[
        {
            name:"id",
            type:"string"
        },
        {
            name: "firstName",
            type: "string"
        },
        {
            name: "lastName",
            type: "string"
        },
        {
            name:"age",
            type:"int"
        }
    ],
    hasMany: [
        {
            model: "SimpleWizard.model.Vehicle",
            //name of method to call in order to retrieve the store. eg. user.getCars();
            name: "getVehicles",
            foreignKey: "userId"
        }
    ],
    hasOne: [
        {
            model: "SimpleWizard.model.Address",
            getterName: "getAddress",
            setterName: "setAddress",
            associationName: "address",
            foreignKey: "userId"
        }
    ]
})
