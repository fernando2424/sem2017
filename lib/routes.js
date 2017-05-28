FlowRouter.route("/",{
  action : function(params,queryParams){
  BlazeLayout.render("mainpage",{mainmenu:"mainnav",banner:"imagenes",soporte:"chat"});

  }

});
FlowRouter.route("/galerias",{
  action : function(params,queryParams){
  BlazeLayout.render("mainPage",{mainmenu:"mainnav"});

  }

});
FlowRouter.route("/form1",{
  action : function(params,queryParams){
  BlazeLayout.render("form1",{form1:"form1"});

  }

});
FlowRouter.route("/mainpage",{
  action : function(params,queryParams){
  BlazeLayout.render("form1",{mainpage:"mainpage"});

  }

});