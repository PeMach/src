var logado = sessionStorage.getItem('logado');
console.log(logado);


if (logado == "true") {
    document.getElementById('btn_sign').style.display = "none";
    document.getElementById('btn_login').style.display = "none";
    document.getElementById('avatar').removeAttribute("hidden");
    
 } else {
    //window.location.href = "/src/cadastro.html";  
 }


/*URL = "http://localhost:3000/usuarios";

//======================================================================
function getusuario(id){

    if(id != 0){
        $('#id').text(id);
        fetch(`${URL}/${id}`).then(res => res.json())    
        .then(data => {
 //           $( "#id" ).prop( "disabled", true ); - Olhar
//           $('#id').val(data.id); - Olhar
            $('#nome').val(data.nome);
            $('#telefone').val(data.telefone);
            $('#email').val(data.email); // Não alteravel
        });
    }    
}

//===============================================================================

const usuarios = JSON.stringify({
    // id: document.getElementById('id').value, - Olhar
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value,
    updated_at: Date.now()
})

if (id >= 0) {
    fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: usuarios
    })
    .then(res => res.json())
    .then(() => location.reload());  
}
// Redirecionar para site de cadastro =  window.location.href = "cadastro.html"; *///