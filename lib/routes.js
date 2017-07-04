FlowRouter.route("/",
    {
        subscriptions: function(params, queryParams) {
            this.register("getCursos",Meteor.subscribe("getCurso2"));
        },
        action:function(){
            BlazeLayout.render("mainPage",{content:"listarCursos"});
        }
    }
);
FlowRouter.route("/cursos",{
        subscriptions: function(params, queryParams) {
            this.register("getCursos",Meteor.subscribe("getCurso2"));
        },
        action:function(){
            BlazeLayout.render("mainPage",{content:"cursoForm"});
        }
    }
);
FlowRouter.route('/cursos/:cursoId', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainPage",{content:"materialForm",params:params});
    }
});
FlowRouter.route('/material/chat/:materialId', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainPage",{content:"chatMaterialForm",params:params});
    }
});
FlowRouter.route('/respuesta/cursos/:preguntaId', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainPage",{content:"respuestaForm",params:params});
    }
});