Template.editarCursoForm.events(
    {
        "click #btnEditarCurso":function(){
            console.log("editar curso2");

            var _nombre=$("#editarCursoNombre").val();
            var _descripcion=$("#editarCursoDescripcion").val();
            var _fechaInicio=$("#editarCursoFechaInicio").val();
            var _fechaFin=$("#editarCursoFechaFin").val();
            var _id=$("#editarCursoId").val();
            obj ={
                nombre: _nombre,
                descripcion: _descripcion,
                fechaInicio:_fechaInicio,
                fechaFin:_fechaFin,
                 _id:_id
            }
            Meteor.call("updateCurso",obj,function(){
            });
            return false;
        }
    }
);