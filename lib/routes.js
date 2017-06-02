FlowRouter.route("/",{
        subscriptions: function(params, queryParams) {
          this.register("getCursos",Meteor.subscribe("getCurso2"));
        },
        action : function(params,queryParams){
          BlazeLayout.render("mainpage",{banner:"banner",content:"contentMain",listarCursos:"listarCursos"});
        }
});

FlowRouter.route("/soporte",{
  subscriptions : function(params,queryParams){
  	     this.register("getMSN",Meteor.subscribe("getMSN",queryParams.idus,queryParams.id));
         this.register("getConnections",Meteor.subscribe("getConnections"));
  },	
  action : function(params,queryParams){
  BlazeLayout.render("mainpage",{banner:"banner_nav",content:"soporteTemplate"});

  }

});
FlowRouter.route("/cursos",{
        subscriptions: function(params, queryParams) {
            this.register("getCursos",Meteor.subscribe("getCurso2"));
            //Meteor.subscribe('tasks');
        },
        action:function(){
            BlazeLayout.render("mainpage",{banner:"banner",content:"contentMain",listarCursos:"cursoForm"});
        }
    }
);