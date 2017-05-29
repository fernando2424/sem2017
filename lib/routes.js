FlowRouter.route("/",{
  action : function(params,queryParams){
  BlazeLayout.render("mainpage",{banner:"banner"});

  }

});

FlowRouter.route("/soporte",{
  action : function(params,queryParams){
  BlazeLayout.render("mainpage",{banner:"banner_nav"});

  }

});