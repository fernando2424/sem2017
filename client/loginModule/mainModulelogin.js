//variable reactiva 
myTemplates = new ReactiveVar();
myTemplates.set("LoginForm");
Template.mainModuleLoggin.helpers({
  	template : function(){

 			return myTemplates.get();
  }

});