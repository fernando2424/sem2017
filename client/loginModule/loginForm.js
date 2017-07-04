Template.loginForm.events({
    "submit form": function(e){
        console.log(e.target.username_email.value);
        console.log(e.target.password.value);
        Meteor.loginWithPassword(e.target.username_email.value,e.target.password.value);
        $(".panelForm").css("opacity",0);
        return false;
    },
    "click #registerbtn":function(){
    	console.log("estas dentro de resgisterbtn");
    	myTemplates.set("registerForm");
    	return false;
    },
    "click #close":function(e){
    	e.preventDefault();
    	$(".panelForm").css("opacity",0);
    	$(".panelForm").css("z-index",-100);
    }
});