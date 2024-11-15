export default {
    cadastrar: function (req, res){
        res.render('permuta/cadastrar');
    },
    listar: function (req, res){
        res.render('permuta/listar', {layout: 'secundario'});
    }
}//Fim do Controller