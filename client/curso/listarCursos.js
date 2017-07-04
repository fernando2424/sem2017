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
Template.listarCursos.helpers({
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
    formatoFecha:function(fecha){
        return moment(fecha).format('YYYY-MM-DD');
    },
    imagen:function(idImagen){
        return FILES.findOne({_id:idImagen}).link();
    }
});