import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
      Meteor.publishComposite("getMSN",function(idUs,idMe){
            return {
                  find(){
                        return CHAT.find(
                              {$or:
                                    [
                                          {idSource:idMe,idDestination:idUs},
                                          {idSource:idUs,idDestination:idMe}
                                          ]});
                  },
                  children:[
                        {
                              find(chat){
                                    return Meteor.users.find({_id:chat.idSource});
                              }
                              
                        },
                        {
                              find(chat){
                                    return Meteor.users.find({_id:chat.idDestination});
                                    
                              }
                        }
                  ]
            }
      });

      Meteor.publishComposite("getConnections",{
            find(){
                  return CONNECT.find({stade:true});
            },
            children:[{
                  find(connect){
                        return Meteor.users.find({_id:connect.idUs});
                  }
            }]

      });
      Meteor.methods({
      	"checkConnection": function(id){
      	 var result	= CONNECT.find({idUs:id,stade:true}).fetch();
      	 if(result.lenght>0){
      	 	return {value:true,id:result[0]._id};
      	 }
      	 return {value:false};
      	},
      	"createConnection": function(idus){
                  console.log(idus);
                  var id = CONNECT.insert({idUs:idus,connectionDate:new Date(),disconnectionDate:new Date(),stade:true});
                  return id;
            },
            "disconnection": function(id){
                  CONNECT.update(id,{$set:{stade:false,disconnectionDate:new Date()}});
                  return true;
            },
            "addCurso": function (msnObj) {
                  console.log("Enter addCurso");
                  CURSO.insert(msnObj);
                  return true;
            },
            "updateCurso": function(Obj){
                  console.log(Obj._id);
                  CURSO.update(Obj._id,{$set:{nombre:Obj.nombre,fechaInicio:Obj.fechaInicio,fechaFin:Obj.fechaFin,descripcion:Obj.descripcion}});
                  return true;
            }
      });

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

Meteor.publish('getCursos', function () {
    return CURSO.find();
});