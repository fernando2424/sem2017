//Suscribirse a getFiles
manager=new SubsManager();
Template.listRespuesta.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        var handler3=manager.subscribe("getRespuestas");
        var handler4=manager.subscribe("getCalificacionRespuesta");
        self.readyFiles.set(handler3.ready());
        self.readyFiles.set(handler4.ready());
    });
});

Template.mainModuleRespuesta.helpers({
    modalTemplate:function()
    {
        return _idPregunta.get();
    }
});
Template.listRespuesta.events(
    {
        "click #closeModalRespuestas":function(e){
            e.preventDefault();
            console.log("Cerrar modal respuestas");
            $(".panelFormModal").css("opacity",0);
            $(".panelFormModal").css("z-index",-1000);
        },
        "click .calificacionRespuestaCorrecta":function(e){
            e.preventDefault();
            console.log("Califiacion respuesta correcta");
            console.log(e.target.id);
            obj ={
                idRespuesta: e.target.id,
                date: new Date(),
                idUs:Meteor.userId(),
                calificacion:1
            }

            Respuesta=RESPUESTA.findOne({_id:e.target.id}, {sort: {date: -1}});
            objRespuesta ={
                _id:Respuesta._id,
                calificacion:Respuesta.calificacion+1
            }
            Meteor.call("addCalificacionRespuesta",obj,function(){
            });
            console.log(objRespuesta);
            Meteor.call("updateRespuesta",objRespuesta,function(){
            });
        },
        "click .calificacionRespuestaIncorrecta":function(e){
            e.preventDefault();
            console.log("Califiacion respuesta correcta");
            console.log(e.target.id);
            obj ={
                idRespuesta: e.target.id,
                date: new Date(),
                idUs:Meteor.userId(),
                calificacion:0
            }

            Respuesta=RESPUESTA.findOne({_id:e.target.id}, {sort: {date: -1}});
            if (Respuesta.calificacion>0) {
                objRespuesta ={
                _id:Respuesta._id,
                calificacion:Respuesta.calificacion-1
            }
            }
            Meteor.call("addCalificacionRespuesta",obj,function(){
            });
            console.log(objRespuesta);
            Meteor.call("updateRespuesta",objRespuesta,function(){
            });
         }
    }
);


Template.listRespuesta.helpers({
    respuestas:function(){
        if(_idPregunta.get()==""){
            return RESPUESTA.find();
        }
        else
        {
            console.log("RESPUESTA");
            return RESPUESTA.find({idPregunta:_idPregunta.get()},{sort: {date: -1}});  
        }
    },
    user_list: function(){
        return Meteor.users.findOne({_id:this.idUs});
    },
    avatar_usuario:function(){
        return Accounts.user().profile.rutaAvatar;
    },
    calificacion_respuesta:function(_idRespuesta){
        try {
                obj_calificacion=CALIFICACION_RESPUESTA.findOne({idRespuesta:_idRespuesta,idUs:Meteor.userId()},{sort: {date: -1}}).calificacion;
                if (obj_calificacion!='undefined') {
                    return obj_calificacion===1;
                }
                return false;
            }
            catch(err) {
                console.log("respuesta listRespuesta.js calificacion_respuesta");
            }

    },
    formatoFecha:function(fecha){
        return moment(fecha).format('YYYY-MM-DD h:mm:ss a');
    }
});