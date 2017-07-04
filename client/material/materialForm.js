//Suscribirse a getFiles
manager=new SubsManager();
Template.materialForm.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        //
        var handler=manager.subscribe("getFiles");
        var handler2=manager.subscribe("getMateriales");
        var handler3=manager.subscribe("getPreguntas");
        var handler4=manager.subscribe("getCursos");

        self.readyFiles.set(handler.ready());
        self.readyFiles.set(handler2.ready());
        self.readyFiles.set(handler3.ready());
        self.readyFiles.set(handler4.ready());
    });
});
Template.materialForm.onRendered(function(){
        $(document).ready(function() {
            $('#editor_texto').summernote({
                placeholder: 'Responder pregunta'
            });
        });
        $('.respuestaModal2').leanModal();
    }
);
////////////////////////////////////////////////
Template.materialForm.helpers({
    materiales:function(){
        console.log(FlowRouter.current().params.cursoId);
        return MATERIAL.find({idCurso:FlowRouter.current().params.cursoId},{sort: {date: -1}});
    },
    preguntas:function(){
        console.log(FlowRouter.current().params.cursoId);
        return PREGUNTA.find({idCurso:FlowRouter.current().params.cursoId},{sort: {date: -1}});
    },
    curso:function(){
        return CURSO.findOne({_id:FlowRouter.current().params.cursoId});
    },
});
Template.materialForm.events({
    "click #btnGuardarRespuesta":function(e){
        var _respuesta=$('#editor_texto').summernote('code');
        console.log(_respuesta);
        /*
         obj ={
         pregunta: _pregunta,
         date: new Date(),
         idCurso:FlowRouter.current().params.cursoId,
         idUs:Meteor.userId()
         }
         Meteor.call("addPregunta",obj,function(){
         });

         $("#pregunta").val("");*/
        return false;
    }
});