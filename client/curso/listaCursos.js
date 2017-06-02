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
    }
});