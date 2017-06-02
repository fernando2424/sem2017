CHAT = new  Mongo.Collection("chat");
CONNECT = new Mongo.Collection("connect");
var chatSchema = new SimpleSchema({
  idSource: {
    type:String
  },
  idDestination: {
    type:String
  },
  date: {
    type:Date
  },
  message: {
    type:String
  }
});
CHAT.attachSchema(chatSchema);
var connectSchema = new SimpleSchema({
  idUs: {
    type:String
  },
  connectionDate: {
    type:Date
  },
  disconnectionDate: {
    type:Date
  },
  stade: {
    type:Boolean
  }
});
CONNECT.attachSchema(connectSchema);
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
        idUs: {
            type:String
        }
});
CURSO.attachSchema(cursoSchema);