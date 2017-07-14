import {Meteor} from 'meteor/meteor';
Meteor.methods({
    "addCurso": function (msnObj) {
        console.log("Enter addCurso2");
        CURSO.insert(msnObj);
        return true;
    },
    "addMaterial": function (msnObj) {
            console.log("Dentro en addMaterial");
            MATERIAL.insert(msnObj);
            return true;
    },
    "addChatMaterial": function (msnObj) {
        console.log("Dentro de addChatMaterial");
        CHAT.insert(msnObj);
        return true;
    },
    "addPregunta": function (msnObj) {
        console.log("Dentro de addPregunta");
        PREGUNTA.insert(msnObj);
        return true;
    },
    "addRespuesta": function (msnObj) {
        console.log("Dentro de addRespuesta");
        RESPUESTA.insert(msnObj);
        return true;
    },
    "updateRespuesta": function(Obj){
        console.log("Estas dentro de server updateRespuesta");
        console.log(Obj);
        RESPUESTA.update(Obj._id,{$set:{calificacion:Obj.calificacion}});
        return true;
    },
    "updatePregunta": function(Obj){
        console.log("Estas dentro de server updatePregunta");
        console.log(Obj);
        PREGUNTA.update(Obj._id,{$set:{calificacion:Obj.calificacion}});
        return true;
    },
    "updateMaterial": function(Obj){
        console.log("Estas dentro de server updateMaterial");
        console.log(Obj);
        MATERIAL.update(Obj._id,{$set:{cantidad:Obj.cantidad}});
        return true;
    },
    "updateMaterialForm": function(Obj){
        console.log("Estas dentro de server updateMaterial Form");
        console.log(Obj);
        MATERIAL.update(Obj._id,{$set:{nombre:Obj.nombre,date:Obj.date,descripcion:Obj.descripcion,rutaVideo:Obj.rutaVideo,tipoVideo:Obj.tipoVideo}});
        return true;
    },
    "addCalificacionRespuesta": function (msnObj) {
        console.log("Dentro de addCalificacionRespuesta");
        CALIFICACION_RESPUESTA.insert(msnObj);
        return true;
    },
    "addCalificacionPregunta": function (msnObj) {
        console.log("Dentro de addCalificacionPregunta");
        CALIFICACION_PREGUNTA.insert(msnObj);
        return true;
    },
    "addNotifiacionRespuesta": function (msnObj) {
        console.log("Dentro de addNotificacionResputa");
        NOTIFICACION_RESPUESTA.insert(msnObj);
        console.log(NOTIFICACION_RESPUESTA);
        return true;
    },
    "addMaterialArchivo": function (msnObj) {
        console.log("addMaterialArchivo");
        MATERIAL_ARCHIVO.insert(msnObj);
        return true;
    },
    "updateCurso": function(Obj){
        console.log(Obj._id);
        CURSO.update(Obj._id,{$set:{nombre:Obj.nombre,fechaInicio:Obj.fechaInicio,fechaFin:Obj.fechaFin,descripcion:Obj.descripcion}});
        return true;
    }
});
Meteor.publish("getFiles",function(){
    return FILES.find().cursor;
});
Meteor.publish("getNotificacionRespuesta",function(){
    return NOTIFICACION_RESPUESTA.find();
});
Meteor.publish("getMaterialArchivo",function(){
    return MATERIAL_ARCHIVO.find();
});
Meteor.publishComposite("getCurso2",{
    find()
    {
    return CURSO.find();
    },
    children:[{
    find(cursos){
        return Meteor.users.find({_id: cursos.idUs});
    }
    }]
});
Meteor.publishComposite("getPreguntas",{
    find()
{
    return PREGUNTA.find();
},
children:[{
    find(preguntas){
    return RESPUESTA.find({idPregunta: preguntas._id});
}
}]
});
Meteor.publishComposite("getChatMaterial",{
    find()
    {
        return CHAT.find();
    },
    children:[{
        find(materiales){
            return Meteor.users.find({_id: materiales.idUs});
        }
    }],
    children:[{
        find(materiales){
            return MATERIAL.find({_id: materiales.idMaterial});
        }
    }]
});

Meteor.publishComposite("getMateriales",{
    find()
    {
        return MATERIAL.find();
    },
children:[{
    find(materiales){
    return Meteor.users.find({_id: materiales.idUs});
}
}]
});
Meteor.publishComposite("getRespuestas",{
    find()
    {
        return RESPUESTA.find();
    },
    children:[{
    find(respuestas)
        {
            return PREGUNTA.find({_id: respuestas.idPregunta});
        }
    }]
});
Meteor.publishComposite("getCalificacionRespuesta",{
    find()
    {
        return CALIFICACION_RESPUESTA.find();
    },
    children:[{
    find(respuestas)
        {
            return Meteor.users.find({_id: respuestas.idUs});
        }
    }]
});
Meteor.publishComposite("getCalificacionPregunta",{
    find()
    {
        return CALIFICACION_PREGUNTA.find();
    },
    children:[{
    find(respuestas)
        {
            return Meteor.users.find({_id: respuestas.idUs});
        }
    }]
});

Meteor.publish('getCursos', function () {
    return CURSO.find();
});
Meteor.publish('getUsuarios', function () {
    return Meteor.users.find();
});
ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '235686586918653',
    secret: '2689108adceb9d84aaeaebaab5b646d5'
});
/*
Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];

    return user;
});*/
Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.nombre = options.nombre;
   user.profile.apellido_paterno= options.apellido_paterno;
   user.profile.apellido_materno= options.apellido_materno;
   user.profile.carrera= options.carrera;
   user.profile.rutaAvatar= options.rutaAvatar;
   // Returns the user object
   return user;
});
/*
if (Meteor.isServer) {
  Meteor.startup(function () {
    UploadServer.init({
      tmpDir: '/public/uploads',
      uploadDir: '/public/uploads',
      checkCreateDirectories: true,
      processing: function()
         {
           $('.dz-message').remove();
         },
         dictDefaultMessage: '<div class="dz-message">My message to show at the start and disapear when you do stuff</div>',
      uploadUrl: '/upload'
    });
  });
}*/