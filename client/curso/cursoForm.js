//Suscribirse a getFiles
manager=new SubsManager();
Template.formUpload.onCreated(function(){
    self=this;
    self.upload=new ReactiveVar(false);
    self.readyFiles= new ReactiveVar(false);
    self.autorun(function(){
        var handler=manager.subscribe("getFiles");
        self.readyFiles.set(handler.ready());
    });
});
////////////////////////////////////////////////
Template.cursoForm.events(
    {
        "submit form":function(){
            var _nombre=$("#nombre").val();
            var _descripcion=$("#descripcion").val();
            var _fechaInicio=$("#fechaInicio").val();
            var _fechaFin=$("#fechaFin").val();
            var _idImagen=$("#idImagen").val();
            console.log("Id de la imagen:");
            console.log(_idImagen);
            obj ={
                nombre: _nombre,
                descripcion: _descripcion,
                fechaInicio:_fechaInicio,
                fechaFin:_fechaFin,
                date: new Date(),
                idImagen:_idImagen,
                idUs:Meteor.userId()
            }

            Meteor.call("addCurso",obj,function(){
            });

            $("#nombre").val("");
            $("#descripcion").val("");
            return false;
        },
        "click .editarCurso":function(e){
            console.log(e.target.id);
            var obj=CURSO.findOne({_id:e.target.id}, {sort: {date: -1}});
            console.log("Enter editar curso");
            $("#editarCursoNombre").val(obj.nombre);
            $("#editarCursoDescripcion").val(obj.descripcion);
            $("#editarCursoFechaInicio").val(moment(obj.fechaInicio).format('YYYY-MM-DD'));
            $("#editarCursoFechaFin").val(moment(obj.fechaFin).format('YYYY-MM-DD'));
            $("#editarCursoId").val(obj._id);

        }
    }
);
Template.cursoForm.helpers({
    ready: function(){
        return FlowRouter.subsReady("getCursos");
    },
    get_cursos: function(){
        return CURSO.find({}, {sort: {date: -1}});
    },
    user_list: function(){
        return Meteor.users.findOne({_id:this.idUs});
    },
    permisoCurso:function(idUs){
        return Meteor.userId() === idUs;
    },
    "queryParams": function () {
        console.log(FlowRouter.current().route._params.keys.postId);
        return FlowRouter.current().route._params.keys.postId.replace(/['"]+/g, '');
    }
});
Template.itemsCursos.helpers({
    permisoCurso:function(idUs){
        return Meteor.userId() === idUs;
    },
    formatoFecha:function(fecha){
        return moment(fecha).format('YYYY-MM-DD');
    },
    sinEspacio:function(texto){
        return texto.trim();
    },
    imagen:function(idImagen){
        return FILES.findOne({_id:idImagen}).link();
    }
});