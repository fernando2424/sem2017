//Suscribirse a getFiles
//VARIABLE REACTIVA
myTemplates=new ReactiveVar();
myTemplates.set("loginForm");



manager=new SubsManager();
Template.menu.onCreated(function(){
    self=this;
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        //
        var handler=manager.subscribe("getFiles");
        var handler2=manager.subscribe("getMateriales");
        var handler3=manager.subscribe("getPreguntas");
        var handler4=manager.subscribe("getRespuestas");
        var handler5=manager.subscribe("getCalificacionPregunta");

        self.readyFiles.set(handler.ready());
        self.readyFiles.set(handler2.ready());
        self.readyFiles.set(handler3.ready());
        self.readyFiles.set(handler4.ready());
        self.readyFiles.set(handler5.ready());
    });
});
Template.menu.helpers({
    username: function()
    {
        return Accounts.user().username;
    },
    total_respuestas:function(){
        myTemplates.set("notificacionesForm");
        total=0;
        obj_respuestas=PREGUNTA.find({idUs:Meteor.userId()},{sort: {date: -1}});
        obj_respuestas.forEach(function(element){
            total=total+RESPUESTA.find({idPregunta:element._id},{sort: {date: -1}}).count();
        });
        return total;
    }
});
Template.menu.events({
    "click #logout":function(e){
        myTemplates.set("loginForm");
        Meteor.logout();
    },
    "click #login":function(e){
    	$(".panelForm").css("opacity",1);
    	$(".panelForm").css("z-index",100);
    },
    "click #notificaciones":function(e){
        myTemplates.set("notificacionesForm");
        $(".panelForm").css("opacity",1);
        $(".panelForm").css("z-index",100);
    },
    "click #close":function(e){
      e.preventDefault();
      $(".panelForm").css("opacity",0);
      $(".panelForm").css("z-index",-100);
    },
    "click #actualizar_perfil":function(e){
      e.preventDefault();
      console.log("Actualizar perfil");
      myTemplates.set("actualizarPerfil");
      $(".panelForm").css("opacity",1);
      $(".panelForm").css("z-index",100);
    }
});
