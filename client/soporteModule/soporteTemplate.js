Template.templateSupport.helpers({
   ready: function(){
   	 return FlowRouter.subsReady("getConnections");
   },
   user_connection_list: function(){
   	return CONNECT.find();
   },
    user_list: function(){
   	return Meteor.users.findOne({_id:this.idUs});
   }

});
Template.itemConnection.events({
	"click #users_list" : function(){
		console.log(this._id);
		FlowRouter.setQueryParams({idus:this._id,id:Accounts.user()._id});
	}
});
Template.msn_template.helpers({

  ready: function(){
    
    return FlowRouter.subsReady("getMSN");
  },
  list_msn: function(){
    return CHAT.find();
  },
  user_source: function(){
    return Meteor.users.findOne({_id:this.idSource});
  },
  user_destination: function(){
    //console.log(this.idSource);
    //console.log(Meteor.users.findOne({_id:this.idSource}));
    
    return Meteor.users.findOne({_id:this.idSource});
  },
  idMe: function(){
    return Accounts.user()._id == this.idSource;  
  }

}); 
