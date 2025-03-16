function excluirDia(id){
    if(confirm("Deseja realmente excluir o Dia?")){
        window.location.href = '/dia/excluir/'+id
    }
}