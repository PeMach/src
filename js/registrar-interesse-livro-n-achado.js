var logado = sessionStorage.getItem('logado');
console.log(logado);


if (logado == "true") {
    document.getElementById('btn_sign').style.display = "none";
    document.getElementById('btn_login').style.display = "none";
    document.getElementById('avatar').removeAttribute("hidden");
    
 } else {
    //window.location.href = "/src/cadastro.html";
 }
URL = "http://localhost:3000/anuncios";

{
//.then(()=> location.reload())
//.cach(console.error);
}

//Criando um produto
//=======================================================================
const anuncios = document.getElementById("registro-interesse-LNE");

anuncios.addEventListener('submit', (e) => {

    let id = parseInt($('#edit-prod-id').text());  

        
    
        const anuncios = JSON.stringify({
            id: "",
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            isbn: document.getElementById("isbn").value,
            price: document.getElementById("livro-valor").value,
            description: document.getElementById("description").value,
            condition: document.getElementById('condition').value,
            type: 'Interesse',
            createad_at: Date.now(),
            updated_at: Date.now()
        })
    
        console.log(anuncios)

        window.alert("O seu interesse foi registrado! :)")
    
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: anuncios
        })
            .then(res => res.json())
            .then(() => location.reload())
})


/// Campo interesse Interesse

//Se "Novo for colocado em if, sempre vai marcar "Usado" e vise e versa
/*function checkTipo() {
    if (document.getElementById('Novo').value == 'on') {
        return 'Novo';
    } else {
        return 'Usado';
    }

}


/*document.getElementById('registrar')
    .addEventListener('click', registrarInteresseLNE)

*/
