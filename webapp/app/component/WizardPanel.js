/**
 * Created by softpsy on 9/25/14.
 */
Ext.define("SimpleWizard.component.WizardPanel",{
    requires:[
        "Ext.container.Container",
        "Ext.layout.CardLayout"
    ],
    extend: "Ext.panel.Panel",

    xtype: "wizardpanel",
    activeItemIndex: 0,

    initComponent: function(){

        var me = this;

        Ext.apply(me, {

            //do not allow layout type to be overridden.. this is a wizard after all
            layout:{
                type:'card'
            },
            activeItem: me.activeItemIndex,
            buttons: [
                {
                    text: "Close",
                    itemId: "closeBtn",
                    handler: me.onCloseBtnClick,
                    scope: me
                },
                '->',
                {
                    text: "Back",
                    itemId: "backBtn",
                    handler: me.onPrevBtnClick,
                    disabled: true,
                    scope: me
                },
                {
                    text: "Next",
                    itemId: "nextBtn",
                    handler: me.onNextBtnClick,
                    scope: me
                }

            ]
        });

        me.addEvents(["start","next","back","close","finish"]);

        me.on({
            render: {
                fn: function(){

                    me.fireEvent("start", me.getLayout().getActiveItem());
                },
                scope: me
            }
        });
        me.callParent(arguments);
    },
    resetWizard: function(){
        var me = this;
        me.activeItemIndex = 0;
        var nextButton = me.getDockedButton("nextBtn").setDisabled(false);
        nextButton.setText("Next");
        me.setWizardActiveItem(me.activeItemIndex);
    },
    onCloseBtnClick: function(){
        var me = this;
        me.fireEvent("close");
    },
    onPrevBtnClick: function(){

        var me = this, backButton = me.getDockedButton("backBtn");

        //on any prev click the next button should be enabled
        var nextButton = me.getDockedButton("nextBtn").setDisabled(false);
        nextButton.setText("Next");

        me.activeItemIndex--;

        if(me.activeItemIndex > 0){

            me.setWizardActiveItem(me.activeItemIndex);
            me.fireEvent("back", me.getLayout().getActiveItem());

        } else if(me.activeItemIndex == 0){

            //reached the first wizard item.. disable back button
            me.setWizardActiveItem(me.activeItemIndex);
            me.getDockedComponent(0).getComponent("backBtn").setDisabled(true);
            me.fireEvent("back", me.getLayout().getActiveItem());

        } else {
            //<debug>
                //this should never happen
                Ext.Error.raise("unexpected item index:"+ me.activeItemIndex);
            //</debug>
        }

    },
    //private
    setWizardActiveItem: function(activeItemIndex){
        var me = this, cardLayout = me.getLayout();
        cardLayout.setActiveItem(activeItemIndex);
    },
    onNextBtnClick: function(){

        var me = this,
            maxItemIndex = me.items.getCount() - 1,
            nextButton = me.getDockedButton("nextBtn");

        //on any next click the back button should be enabled
        me.getDockedButton("backBtn").setDisabled(false);

        me.activeItemIndex++;

        if(me.activeItemIndex < maxItemIndex){

            me.setWizardActiveItem(me.activeItemIndex);
            me.fireEvent("next", me.getLayout().getActiveItem());

        } else if(me.activeItemIndex == maxItemIndex){

            //the next item is the last one.. change text to finish
            me.setWizardActiveItem(me.activeItemIndex);
            nextButton.setText("Finish");
            me.fireEvent("next", me.getLayout().getActiveItem());

        } else if(me.activeItemIndex == maxItemIndex+1){

            //disable the next button this was the last step
            nextButton.setDisabled(true);

            me.activeItemIndex = maxItemIndex;
            me.fireEvent("finish");

        } else {
            //<debug>
                //this should never happen
                Ext.Error.raise("unexpected item index:"+ me.activeItemIndex);
            //</debug>
        }

    },
    getDockedButton: function(buttonItemId){
        var me = this;
        return me.getDockedComponent(0).getComponent(buttonItemId)
    }


});
