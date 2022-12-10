const URL_BASE = 'http://localhost:3000/';
const URL_API = 'http://localhost:8000/';


async function apiPost(url, headers, body) {

    var requestOptions = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: body,
        redirect: 'follow'
    };

    let resposta = await fetch(url, requestOptions);

    console.log(resposta);

    if (resposta.ok) {
        if (resposta.headers['content-lenght'] > 0)
            return await resposta.json();
        else
            return "";
    }

    let erro = await resposta.text();
    throw erro;
}

async function apiGet(url) {
    let resposta = await fetch(url);

    if (resposta.status == 200)
        return await resposta.json();

    let erro = await resposta.text();
    throw erro;
}

async function getByEmail(email) {
    let url = `${URL_BASE}usuarios?email=${email}`;
    return await apiGet(url);
}

function enviarMail(email, nome, assunto, conteudo) {

    var myHeaders = new Headers();

    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "personalizations": [
            {
                "to": [
                    {
                        "email": email,
                        "name": nome
                    }
                ],
                "subject": assunto
            }
        ],
        "content": [
            {
                "type": "text/plain",
                "value": conteudo
            }
        ],
        "from": {
            "email": "comparthists2022@outlook.com",
            "name": "Compartilhando Histórias"
        },
        "reply_to": {
            "email": "comparthists2022@outlook.com",
            "name": "Compartilhando Histórias"
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.sendgrid.com/v3/mail/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


}


async function recuperarSenha(email) {

    let myHeaders = new Headers();
    myHeaders.append("email", email);
    myHeaders.append("Content-Type", "application/json");

    try {

        let apiResp = await apiPost(`${URL_API}recover`, myHeaders, '[]');
        alert(apiResp);
    }
    catch(error){
        alert(error);              
    }
}

function gerarSenha() {
    let senha = {};
    senha.texto = Math.random().toString(36).slice(-10);
    senha.md5 = btoa(senha.texto);

    return senha;
}



async function novaSenha(email) {

    userId = sessionStorage.getItem('id')
    
    if (userId.length == 0) {

        alert('Email não cadastrado ou não corresponde a conta');
        return false;
    }

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var input = document.getElementById("Confirm")

    var texto = input.value

    var input2 = document.getElementById("Confirm2")

    var texto2 = input2.value

    if (texto != texto2) {
        alert('Senhas não coincidem');
        return false;
    }

    var raw = JSON.stringify({
        "senha": texto2
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/usuarios/${userId}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    alert('Senha alterada com sucesso!');

    return true;


}

