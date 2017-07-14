Template.respuestaForm.onRendered(function(){
        $(document).ready(function() {
            $('#editor_texto').summernote({
                placeholder: 'Responder pregunta'
            });
        });
    }
);
//Suscribirse a getFiles
manager=new SubsManager();
Template.respuestaForm.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        var handler3=manager.subscribe("getRespuestas");
        self.readyFiles.set(handler3.ready());
    });
});
Template.respuestaForm.events({
    "click #btnGuardarRespuesta":function(e){
        var _respuesta=$('#editor_texto').summernote('code');
        console.log(_respuesta);
        obj ={
            respuesta: _respuesta,
            date: new Date(),
            idPregunta:FlowRouter.current().params.preguntaId,
            idUs:Meteor.userId(),
            puntaje:0
        }
        console.log(obj);
        Meteor.call("addRespuesta",obj,function(){
        });
        $("#editor_texto").summernote("code", "");
        return false;
    }
});
Template.respuestaForm.helpers({
    respuestas:function(){
        console.log(FlowRouter.current().params.preguntaId);
        console.log(RESPUESTA.find({idPregunta:FlowRouter.current().params.preguntaId}));
        return RESPUESTA.find({idPregunta:FlowRouter.current().params.preguntaId},{sort: {date: -1}});
    },
    user_list: function(){
        return Meteor.users.findOne({_id:this.idUs});
    },
    avatar_usuario:function(){
        return Accounts.user().profile.rutaAvatar;
    }
});