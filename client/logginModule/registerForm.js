////////////////////////////////////////////////
IDIMAGEN="";
manager=new SubsManager();
Template.registerForm.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        var handler=manager.subscribe("getFiles");
        self.readyFiles.set(handler.ready());
    });
});

Template.registerForm.events({
    "submit form": function(e){
       var user = {
         "username" : e.target.username.value,
         "email" : e.target.email.value,
         "password" : e.target.password.value,
           "nombre" : e.target.nombre.value,
           "apellido_paterno" : e.target.apellido_paterno.value,
           "apellido_materno" : e.target.apellido_materno.value,
           "carrera" : e.target.carrera.value,
           "rutaAvatar":e.target.rutaAvatar.value,
         "profile" : {
           "nombre" : e.target.nombre.value,
           "apellido_paterno" : e.target.apellido_paterno.value,
           "apellido_materno" : e.target.apellido_materno.value,
           "carrera" : e.target.carrera.value,
           "rutaAvatar":e.target.rutaAvatar.value
            }
        }
        Accounts.createUser(user,function(e){
          console.log("Estas registrando user");
          console.log(user);
           if(e==undefined)
           {
               Meteor.loginWithPassword(user.username,user.password);
           }
        });
        $(".panelForm").css("z-index",-100);
        $(".panelForm").css("opacity",0);
        return false;
    },
    "click #return":function(){
      myTemplates.set("loginForm");
    },
    "click #close":function(e){
      e.preventDefault();
      $(".panelForm").css("opacity",0);
      $(".panelForm").css("z-index",-100);
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
Template.registerForm.onRendered(function(){
  $("select").material_select();
});

Template.registerForm.helpers({
    fileSend:function(){
        return Template.instance().upload.get();
    },
    imagen:function(){
        return FILES.findOne({_id:IDIMAGEN});
    }
});

