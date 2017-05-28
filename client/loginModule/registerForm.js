Template.registerForm.onRendered(function(){
  $("select").material_select();
});
Template.registerForm.events({
   "click #return" : function(){
    	myTemplates.set("LoginForm");
   },
   "click #close"  : function(){
     $(".panelForm").css("opacity",0);
   },
   "submit form" : function(e){
   	var user = {
         "username" : e.target.username.value,
         "email" : e.target.email.value,
         "password" : e.target.password.value,
         "profile" : {
         	 "nombre" : e.target.nombre.value,
         	 "apellido_paterno" : e.target.apellido_paterno.value,
         	 "apellido_materno" : e.target.apellido_materno.value,
         	 "carrera" : e.target.carrera.value,
            }
     	};
     	Accounts.createUser(user, function(e){
     		if(e == undefined){
     			Meteor.loginWithPassword(user.username,user.password);
     		}
     	});
      $(".panelForm").css("opacity",0);  
     	return false;
   }
});