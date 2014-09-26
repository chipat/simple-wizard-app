/**
 * Created by softpsy on 9/26/14.
 */
Ext.define("SimpleWizard.component.VehicleForm",{
    extend: "Ext.grid.Panel",
    requires: ["SimpleWizard.model.Vehicle"],
    xtype: "vehicleform",
    initComponent: function(){

        var me = this;

        me.store = Ext.create('Ext.data.Store', {
            model: 'SimpleWizard.model.Vehicle',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'users'
                }
            }
        });

        var rowEditorPlugin = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                cancelEdit: me.onCancelEditVehicle,
                scope: me
            }
        });

        Ext.apply(me, {
            plugins: [rowEditorPlugin],
            columns: [
                {   header: 'Make',
                    dataIndex: 'make',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    header: 'Model',
                    dataIndex: 'model',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }},
                {
                    header: 'Year',
                    dataIndex: 'year',
                    editor: {
                        xtype: 'numberfield'
                    }
                }
            ],
            buttons:[
                {
                    text: "Add Vehicle",
                    handler: me.onAddVehicleBtn,
                    scope: me
                }
            ]
        });
        me.callParent(arguments);
    },
    onAddVehicleBtn: function(){
        var me = this;
        var newVehicle = Ext.create("SimpleWizard.model.Vehicle");
        me.store.add(newVehicle);
    },
    onCancelEditVehicle: function(rowEditing, context){
        var me = this;
        //remove if phantom record
        if (context.record.phantom) {
            me.store.remove(context.record);
        }
    },
    setVehicleStore: function(store){
        var me = this;
        //silently remove all records
        me.store.removeAll(true);
        me.store.loadRecords(store.getRange());
    }

});