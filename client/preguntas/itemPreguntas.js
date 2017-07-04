//Suscribirse a getFiles
manager=new SubsManager();
Template.itemPreguntas.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.preguntaId=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        var handler3=manager.subscribe("getPreguntas");
        self.readyFiles.set(handler3.ready());
    });
});
Template.itemPreguntas.onRendered(function(){
        $(document).ready(function() {
            $('#editor_texto').summernote({
                placeholder: 'Responder pregunta'
            });
        });
        $('.respuestaModal2').leanModal();
        console.log("dentro de js itempreguntas");
    }
);
Template.itemPreguntas.events({
    "click .btnResponder":function(e,template){
        template.preguntaId.set(e.target.id);
        $("#hiddenPreguntaId").val(e.target.id);
        console.log(e.target.id);
        console.log(Template.instance().preguntaId.get());
        console.log($("#hiddenPreguntaId").val());
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
Template.itemPreguntas.helpers({
    preguntas:function(){
        console.log(FlowRouter.current().params.cursoId);
        return PREGUNTA.find({idCurso:FlowRouter.current().params.cursoId},{sort: {date: -1}});
    }
});