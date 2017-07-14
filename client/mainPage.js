manager=new SubsManager();
Template.mainPage.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        //
    
        
        var handler8=manager.subscribe("getNotificacionRespuesta");
        self.readyFiles.set(handler8.ready());
        
    });
});
_idPregunta=new ReactiveVar();
_idPregunta.set("");

Template.mainPage.onRendered(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
});
//////////////////
Template.mainPage.helpers({
    getEmail() {
    return Meteor.user().emails && Meteor.user().emails[0].address;
}
});

Template.mainPage.events({
    'click button.log-in'(event) {
    event.preventDefault();
    Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
        if (err) {
            console.log('Handle errors here: ', err);
        }
    });
},
'click button.log-out'(event) {
    event.preventDefault();
    Meteor.logout();
}
});
/////////////////////



/*
ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '235686586918653',
    secret: '2689108adceb9d84aaeaebaab5b646d5'
});
Template.mainPage.events({
    'click .login-facebook': function(e) {
        e.preventDefault();

        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            }
        });
    }
});
Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];

    return user;
});*/