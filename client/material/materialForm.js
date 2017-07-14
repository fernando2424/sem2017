opcionPregunta=new ReactiveVar();
opcionPregunta.set("preguntas_nuevas");

opcionMateriales=new ReactiveVar();
opcionMateriales.set("materiales_antiguos");

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
        var handler4=manager.subscribe("getRespuestas");
        var handler5=manager.subscribe("getCalificacionPregunta");
        var handler6=manager.subscribe("getCursos");
        

        self.readyFiles.set(handler.ready());
        self.readyFiles.set(handler2.ready());
        self.readyFiles.set(handler3.ready());
        self.readyFiles.set(handler4.ready());
        self.readyFiles.set(handler5.ready());
        self.readyFiles.set(handler6.ready());
    });
});
Template.materialForm.onRendered(function(){
        $(document).ready(function() {
            $('#editor_texto').summernote({
                placeholder: 'Responder pregunta'
            });
        });
        //$('.respuestaModal').leanModal();
    }
);
////////////////////////////////////////////////
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
    },
    "click #PreguntasMejores":function(e){
            opcionPregunta.set("preguntas_mejores");
            return false;
    },
    "click #PreguntasNuevas":function(e){
            opcionPregunta.set("preguntas_nuevas");
            return false;
    },
    "click #materialesAntiguos":function(e){
            opcionMateriales.set("materiales_antiguos");
            return false;
    },
    "click #materialesNuevos":function(e){
            opcionMateriales.set("materiales_nuevos");
            return false;
    }
    
});
Template.materialForm.helpers({
    materiales:function(){
        if (opcionMateriales.get()==="materiales_antiguos") {
            PREGUNTA.find({idCurso:FlowRouter.current().params.cursoId},{sort: {'calificacion': 'desc'}});
            return MATERIAL.find({idCurso:FlowRouter.current().params.cursoId});
        }
        if (opcionMateriales.get()==="materiales_nuevos") {
            return MATERIAL.find({idCurso:FlowRouter.current().params.cursoId},{sort: {'date': -1}});
        }

        console.log(FlowRouter.current().params.cursoId);
        
    },
    preguntas:function(){
        console.log(FlowRouter.current().params.cursoId);
        return PREGUNTA.find({idCurso:FlowRouter.current().params.cursoId});
    },
    permiso_curso:function(){
        var objCurso=CURSO.findOne({_id:FlowRouter.current().params.cursoId});
        if(objCurso.idUs===Meteor.userId())
            return true;
        else
            return false;
    },
    nombre_curso:function(){
      return   CURSO.findOne({_id:FlowRouter.current().params.cursoId}).nombre;
    }
});