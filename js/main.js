var logado = sessionStorage.getItem('logado');
console.log(logado);


if (logado == "true") {
    document.getElementById('btn_sign').style.display = "none";
    document.getElementById('btn_login').style.display = "none";
    document.getElementById('avatar').removeAttribute("hidden");
    
 } else {
    //window.location.href = "/src/entrar.html";
 }


$(function () {
    $('#cadastro-livro').submit(function (e) {
        e.preventDefault();
        getLastId('anuncios');
        const URL = 'http://localhost:3000/anuncios';
        const anuncios = JSON.stringify({
            
            user_id: "",
            id: document.getElementById('id').value,
            title: document.getElementById('livro-title').value,
            author: document.getElementById('livro-author').value,
            isbn: document.getElementById('livro-ISBN').value,
            descripiton: document.getElementById('description').value,
            genero: document.getElementById('livro-genero').value,
            edition: document.getElementById('livro-edition').value,
            date: document.getElementById('livro-publi').value,
            price: document.getElementById('livro-valor').value,
            details: document.getElementById('especial-desc').value,
            special_ed: document.getElementById('ed_esp').value,
            imagem: "",
            type: document.getElementById('interesse').value,
            conditon: document.getElementById('estado').value,
            details_ed: document.getElementById('especial-desc').value,
            status: 1,
            cretead_at: Date.now(),
            updated_at: Date.now()
        });
        var req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: anuncios
        };

        fetch(URL, req)
            .then(res => res.json());
        //.then(() => location.reload());
    });
});

$('#ed_esp').change(function(){
    var teste = $('#ed_esp').value;
    console.log(teste); 
});


function _oldgetBase64() {
    var file = document.querySelector('#file').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        document.getElementById("imagem").value = reader.result;
        //console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
//var file = document.querySelector('#file').files[0];
//getBase64(file);

function getLastId(type) {
    const U = 'http://localhost:3000/';
    fetch(U + type)
        .then((response) => response.json())
        .then((data) => {
            let cont = 0;
            for (const fields of data) {
                cont++;
            }
            document.getElementById("id").value = cont + 1;
        })
        .catch(console.error);
}

URL = "http://localhost:3000/usuarios";

function enviarCadastro() {

    const cadastroUsuario = document.getElementById("cadastro-usuario");

    const usuarios = JSON.stringify({
        id: "",
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        createad_at: Date.now(),
        updated_at: Date.now()
    })

    console.log(usuarios)

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: usuarios
    })
        .then(res => res.json())
        alert('Cadastro realizado com sucesso!')
}

