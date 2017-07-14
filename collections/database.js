FILES = new FilesCollection({/*
    storePath:'E:/proyecto-meteor/files-proyecto',
    downloadRoute:'E:/proyecto-meteor/files-proyecto/donwload',*/
    collectionName:"files",
    chunkSize:1024*2048,
    allowClient:false
});

CHAT = new Mongo.Collection("chat");
var chatSchema=new SimpleSchema({
    mensaje:{
        type:String
    },
    date:{
        type:Date
    },
    tipoArchivo:{
        type:String
    },
    rutaArchivo:{
        type:String
    },
    idUs: {
        type:String
    },
    idMaterial: {
        type:String
    }
});
CHAT.attachSchema(chatSchema);

CURSO = new Mongo.Collection("curso");
var cursoSchema=new SimpleSchema({
        nombre:{
            type:String
        },
        date:{
            type:Date
        },
        fechaInicio:{
            type:Date
        },
        fechaFin:{
            type:Date
        },
        descripcion:{
            type:String
        },
        idImagen:{
            type:String
        },
        idUs: {
            type:String
        }
});
CURSO.attachSchema(cursoSchema);

MATERIAL = new Mongo.Collection("material");
var materialSchema=new SimpleSchema({
    nombre:{
        type:String
    },
    date:{
        type:Date
    },
    descripcion:{
        type:String
    },
    rutaVideo:{
        type:String
    },
    tipoVideo:{
        type:String
    },
    idUs: {
        type:String
    },
    idCurso: {
        type:String
    },
    cantidad: {
        type:Number
    }
});
MATERIAL.attachSchema(materialSchema);

ARCHIVO = new Mongo.Collection("archivo");
var archivoSchema=new SimpleSchema({
    nombre:{
        type:String
    },
    date:{
        type:Date
    },
    descripcion:{
        type:String
    },
    ruta:{
        type:String
    },
    tipo:{
        type:String
    },
    idUs: {
        type:String
    },
    idMaterial: {
        type:String
    }
});
ARCHIVO.attachSchema(archivoSchema);

var archivoSchema=new SimpleSchema({
    nombre:{
        type:String
    },
    date:{
        type:Date
    },
    descripcion:{
        type:String
    },
    ruta:{
        type:String
    },
    tipo:{
        type:String
    },
    idUs: {
        type:String
    },
    idMaterial: {
        type:String
    }
});
ARCHIVO.attachSchema(archivoSchema);

PREGUNTA = new Mongo.Collection("pregunta");
var preguntaSchema=new SimpleSchema({
    pregunta:{
        type:String
    },
    date:{
        type:Date
    },
    idUs: {
        type:String
    },
    idCurso: {
        type:String
    },
    calificacion:{
        type:Number
    }
});
PREGUNTA.attachSchema(preguntaSchema);

RESPUESTA = new Mongo.Collection("respuesta");
var respuestaSchema=new SimpleSchema({
    respuesta:{
        type:String
    },
    date:{
        type:Date
    },
    idUs: {
        type:String
    },
    idPregunta: {
        type:String
    },
    calificacion:{
        type:Number
    }
});
RESPUESTA.attachSchema(respuestaSchema);

CALIFICACION_RESPUESTA = new Mongo.Collection("calificacionRespuesta");
var calificacionRespuestaSchema=new SimpleSchema({
    idRespuesta: {
        type:String
    },
    idUs: {
        type:String
    },
    date:{
        type:Date
    },
    calificacion: {
        type:Number
    }
});
CALIFICACION_RESPUESTA.attachSchema(calificacionRespuestaSchema);

CALIFICACION_PREGUNTA = new Mongo.Collection("calificacionPregunta");
var calificacionPreguntaSchema=new SimpleSchema({
    idPregunta: {
        type:String
    },
    idUs: {
        type:String
    },
    date:{
        type:Date
    },
    calificacion: {
        type:Number
    }
});
CALIFICACION_PREGUNTA.attachSchema(calificacionPreguntaSchema);

NOTIFICACION_RESPUESTA = new Mongo.Collection("notificacionRespuesta");
var notificacionRespuestaSchema=new SimpleSchema({
    pregunta: {
        type:String
    },
    idPregunta: {
        type:String
    },
    nombreUsuarioPregunto: {
        type:String
    },
    idUsuarioPregunto: {
        type:String
    },
    nombreUsuarioRespondio: {
        type:String
    },
    idUsuarioRespondio: {
        type:String
    },
    date:{
        type:Date
    },
    estado: {
        type:Number
    },
    idCurso: {
        type:String
    },
    rutaAvatarPregunto: {
        type:String
    },
    rutaAvatarRespondio:{
        type:String
    }
});
NOTIFICACION_RESPUESTA.attachSchema(notificacionRespuestaSchema);

MATERIAL_ARCHIVO = new Mongo.Collection("materialArchivo");
var materialArchivoSchema=new SimpleSchema({
    nombre:{
        type:String
    },
    date:{
        type:Date
    },
    ruta:{
        type:String
    },
    tipo:{
        type:String
    },
    idUs: {
        type:String
    },
    idMaterial: {
        type:String
    }
});
MATERIAL_ARCHIVO.attachSchema(materialArchivoSchema);