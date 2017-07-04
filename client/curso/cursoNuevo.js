manager=new SubsManager();
Template.nuevoCurso.onCreated(function(){
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
Template.nuevoCurso.events({
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
Template.nuevoCurso.helpers({
    fileSend:function(){
        return Template.instance().upload.get();
    },
    imagen:function(){
        return FILES.findOne({_id:IDIMAGEN});
    }
});
