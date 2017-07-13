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
    "updateCurso": function(Obj){
        console.log(Obj._id);
        CURSO.update(Obj._id,{$set:{nombre:Obj.nombre,fechaInicio:Obj.fechaInicio,fechaFin:Obj.fechaFin,descripcion:Obj.descripcion}});
        return true;
    }
});
Meteor.publish("getFiles",function(){
    return FILES.find().cursor;
});
Meteor.publish("getMateriales",function(){
    return MATERIAL.find();
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
    return Meteor.users.find({_id: preguntas.idUs});
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
   user.profile.nombre = options.firstName;
   user.profile.lastName = options.lastName;
   user.profile.apellido_paterno= options.apellido_paterno;
   user.profile.apellido_materno= options.apellido_materno;
   user.profile.carrera= options.carrera;
   user.profile.rutaAvatar= options.rutaAvatar;
   // Returns the user object
   return user;
});