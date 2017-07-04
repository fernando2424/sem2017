Template.materialForm.onRendered(function(){
    $('.modalFormMaterial').leanModal();
});
manager=new SubsManager();
Template.chatMaterialForm.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        var handler=manager.subscribe("getFiles");
        var handler2=manager.subscribe("getChatMaterial");
        var handler3=manager.subscribe("getMateriales");
        var handler4=manager.subscribe("getUsuarios");

        self.readyFiles.set(handler.ready());
        self.readyFiles.set(handler2.ready());
        self.readyFiles.set(handler3.ready());
        self.readyFiles.set(handler4.ready());
    });
});
////////////////////////////////////////////////
IDIMAGEN="";
Template.chatMaterialForm.events({
    "submit form":function(){
        var _mensajeChat=$("#mensajeChat").val();
        var _idUs=Meteor.userId();
        var _idMaterial=FlowRouter.current().params.materialId;
        console.log(_mensajeChat);

        obj ={
            mensaje: _mensajeChat,
            date: new Date(),
            rutaArchivo:"no tiene",
            tipoArchivo:"no tiene",
            idUs:_idUs,
            idMaterial:_idMaterial
        }
        Meteor.call("addChatMaterial",obj,function(){
            console.log("Dentro");
        });
        $("#mensajeChat").val("");
        return false;
    }/*,
    "change #fileImages":function(e,template){
        template.upload.set(true);
        if(e.currentTarget.files && e.currentTarget.files[0])
        {
            console.log( e.currentTarget.files[0]);
            var upload=FILES.insert({
                file: e.currentTarget.files[0],
                streams:"dynamic",
                chunkSize:"dynamic"
            },false);
            upload.on("start",function(){
                template.upload.set(true);
            });
            upload.on("end",function(err,fileObj){
                IDIMAGEN=fileObj._id;
                if(err){
                    alert("ERROR"+err)
                }
                template.upload.set(false);
            });
            upload.start();
        }
    }*/
});
Template.chatMaterialForm.helpers({
    fileSend:function(){
        return Template.instance().upload.get();
    },
    imagen:function(){
        return FILES.findOne({_id:IDIMAGEN});
    },
    getChatMaterial:function(){
        return CHAT.find({idMaterial:FlowRouter.current().params.materialId},{sort: {date: -1}});
    },
    user_list: function(){
        return Meteor.users.findOne({_id:this.idUs});
    },
    getNombreUsuario: function(idUs){
        console.log(idUs);
        console.log(Meteor.users.find({_id:idUs}).fetch());
        return Meteor.users.findOne({_id:idUs});
    },
    getMaterial: function(){
        return MATERIAL.findOne({_id:FlowRouter.current().params.materialId});
    }
});