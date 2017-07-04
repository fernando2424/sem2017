Template.materialForm.onRendered(function(){
    $('.modalFormMaterial').leanModal();
});
manager=new SubsManager();
Template.nuevoMaterial.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        var handler=manager.subscribe("getFiles");
        self.readyFiles.set(handler.ready());
    });
});
////////////////////////////////////////////////
IDIMAGEN="";
Template.nuevoMaterial.events({
    "submit form":function(){
        var _nombre=$("#nombre").val();
        var _descripcion=$("#descripcion").val();
        var _rutaVideo=$("#rutaVideo").val();
        var _tipoVideo=$("#tipoVideo").val();
        var _idCurso=$("#idCurso").val();
        obj ={
            nombre: _nombre,
            descripcion: _descripcion,
            date: new Date(),
            rutaVideo:_rutaVideo,
            tipoVideo:_tipoVideo,
            idUs:Meteor.userId(),
            idCurso:_idCurso
        }
        Meteor.call("addMaterial",obj,function(){
            console.log("Dentro");
        });
        $("#nombre").val("");
        $("#descripcion").val("");
        return false;
    },
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
    }
});
Template.nuevoMaterial.helpers({
    fileSend:function(){
        return Template.instance().upload.get();
    },
    imagen:function(){
        return FILES.findOne({_id:IDIMAGEN});
    }
});
