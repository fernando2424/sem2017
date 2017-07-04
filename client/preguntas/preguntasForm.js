Template.preguntasForm.onRendered(function(){
        $(document).ready(function() {
            $('#editor_texto').summernote();
        });
        $('.preguntaNuevaModal').leanModal();
    }
);
Template.preguntasForm.onRendered(function(){
        $(document).ready(function() {
            $('#editor_texto').summernote({
                placeholder: 'Responder pregunta'
            });
        });
        $('.respuestaModal').leanModal();
    }
);
Template.preguntasForm.events({
    "click #btnPreguntaNueva":function(e){
        var _pregunta=$("#pregunta").val();
        console.log("Id de la imagen:");
        obj ={
            pregunta: _pregunta,
            date: new Date(),
            idCurso:FlowRouter.current().params.cursoId,
            idUs:Meteor.userId()
        }
        Meteor.call("addPregunta",obj,function(){
        });

        $("#pregunta").val("");
        return false;
    }
});