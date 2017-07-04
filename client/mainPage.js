Template.mainPage.onRendered(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $(".panelForm").css("opacity",0);
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