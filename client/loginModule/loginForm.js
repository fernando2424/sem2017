Template.LoginForm.events({
	"click #registerbtn" : function(e){
		e.preventDefault();
		myTemplates.set("registerForm");
	},
	"click #close" : function(e){
	e.preventDefault();
	$(".panelForm").css("opacity",0);

	}, 
	"submit form" : function(e){
		Meteor.loginWithPassword(e.target.nick_email.value,e.target.password.value);
		$(".panelForm").css("opacity",0);
		return false;

	}

})