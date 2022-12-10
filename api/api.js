const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const URL_BASE = 'http://localhost:3000/';



async function apiPost(url, headers, body) {

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: body,
        redirect: 'follow'
    };

    let resposta = await fetch(url, requestOptions);

    console.log(await resposta.text());

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

    if (resposta.ok)
        return await resposta.json();

    let erro = await resposta.text();
    throw erro;
}

async function getByEmail(email) {
    let url = `${URL_BASE}usuarios?email=${email}`;
    return await apiGet(url);
}

function gerarSenha() {
    console.log('gerando nova senha');
    let senha = {};
    senha.texto = Math.random().toString(36).slice(-10);
    senha.md5 = btoa(senha.texto);

    return senha;
}

async function enviarMail(email, nome, assunto, conteudo) {
    console.log('enviando email');

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

    return await apiPost("https://api.sendgrid.com/v3/mail/send", myHeaders, raw);
}

async function recuperarSenha(email) {

    let usuario = await getByEmail(email);

    if (usuario.length == 0) {

        console.log("OLÁAA");

        throw 'testtttttttttttttt';
    }

    usuario = usuario[0];


    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");


    let novaSenha = gerarSenha();

    var raw = JSON.stringify({
        "senha": novaSenha.md5
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log('atualizando o usuário');

    fetch(`http://localhost:3000/usuarios/${usuario.id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    let assunto = "Nova senha";

    let conteudo = `Olá, aqui está sua nova senha ${novaSenha.md5}`;

    await enviarMail(email, usuario.nome, assunto, conteudo);

    return 'senha enviada com sucesso';
}

async function passwordRecovery(req, res) {
    let email = req.headers['email'];
    console.log(req.headers);
    try {
        let response = await recuperarSenha(email);
        console.log(response);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json('erro recuperando senha');
    }

}

app.use(cors());



app.get('/', (req, res) => res.send('API de emails online!'));

app.post('/recover', passwordRecovery);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));