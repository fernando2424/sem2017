FlowRouter.route("/",{
  action : function(params,queryParams){
  BlazeLayout.render("mainpage",{mainmenu:"mainnav",banner:"banner",content:"contentMain"});

  }

});

FlowRouter.route("/soporte",{
  action : function(params,queryParams){
  BlazeLayout.render("mainpage",{banner:"banner_nav",content:"soporteTemplate"});

  }

});