import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
      Meteor.methods({
      	"checkConnection" : function (id){
      	 var result	= CONNECT.find({idUs:id,stade:true}).fetch();
      	 if(result.lenght>0){
      	 	return {value:true,id:result[0]._id};
      	 }
      	 return {value:true};
      	},
      	"createConnection": function(idus){
                  console.log(idus);
                  var id = CONNECT.insert({idUs:idus,connectionDate:new Date(),disconnectionDate:new Date(),stade:true});
                  return id;
            },
            "disconnection": function(id){
                  CONNECT.update(id,{$set:{stade:false,disconnectionDate:new Date()}});
                  return true;
            }

      });
});
