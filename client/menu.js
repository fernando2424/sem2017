Template.menu.helpers({
    username: function()
    {
        return Accounts.user().username;
    }
});
Template.menu.events({
    "click #logout":function(e){
        Meteor.logout();
    },
    "click #login":function(e){
    	$(".panelForm").css("opacity",1);
    	$(".panelForm").css("z-index",100);
    	
    }
});