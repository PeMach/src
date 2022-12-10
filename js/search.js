'use strict';

const GOOGLE_BOOK_API = "https://www.googleapis.com/books/v1/volumes?q=";
const ANYBOOK_API = "http://anybook.valdeirmendes.com:3000/";
const API_KEY = "AIzaSyBhTmP67mrRHyCfeW50fx1nTBwUIZFxTf8";
const findless = document.getElementById("findless");
const loader = document.getElementById("loader");

const O_COVER_TAG = '<div class="row col-md-12 mb-3"> <div class="cover col-auto img-fluid"> <img src="';
const C_COVER_TAG = '" alt="Capa"></div>';
const O_AUTHOR_TAG = '<div class="col-md-8 card-body"> <strong class="d-inline-block mb-2 text-secundary">';
const C_AUTHOR_TAG = '</strong>';
const O_TITLE_LNK = '<a href="detalhes_livro.html?book=';
const O_TITLE_TAG = '"><h5 class="mb-0">';
const C_TITLE_TAG = '</h5></a>';
const O_PUB_TAG = '<div class="mb-1 text-muted">Editora: ';
const C_PUB_TAG = '</div>';
const O_DESC_TAG = '<p class="card-text mb-0 text-muted"><small>';
const C_DESC_TAG = '</small></p><div>';
const O_LIKE_TAG = '<div> <strong><i class="fa fa-lg fa-heart text-danger"></i> ';
const O_COMMENT_TAG = '<strong class="mr-3"><i class="fa fa-lg fa-comments text-warning"></i> ';
const C_LIKE_TAG =' </strong>';
const C_COMMENT_TAG = ' </strong>';
const O_POST_BTN = '<a href="/anuncio_livro_encontrado.html?book=';
const O_SHOP_BTN = '<a href="/anuncios?book=';
const C_POST_BTN = '" class="btn-primary-sm ml-2">Anunciar</a>';
const C_SHOP_BTN = '" class="btn-black-sm ml-1">Visualizar anúncios</a>';
const C_4DIV_TAG = '</div></div></div></div>';


var url_str = window.location.href;
var url = new URL(url_str);
var query_str = url.searchParams.get('q');

httpUtil(query_str.trim());

loader.style.display = "none";
findless.removeAttribute("hidden");

function httpUtil(q) {

    var book_desc, book_capa, book_author, likes, comments, shop, book_publisher, book_isbn, book_title, book_date;

    var url = GOOGLE_BOOK_API + q + "&key=" + API_KEY;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    var obj = JSON.parse(xhttp.responseText); 

    for (let i = 0; i < obj.items.length; i++) {

        if(obj.items[i].volumeInfo !== undefined){

        book_title = ((obj.items[i].volumeInfo.title) ? obj.items[i].volumeInfo.title : 'Untitled');
        book_desc = ((obj.items[i].volumeInfo.description) ? obj.items[i].volumeInfo.description.slice(0,300) + "...": '');
        book_capa = ((obj.items[i].volumeInfo.imageLinks) ? obj.items[i].volumeInfo.imageLinks.thumbnail: "../images/book_thumb.png");
        book_author = (obj.items[i].volumeInfo.authors !== undefined) ? obj.items[i].volumeInfo.authors: '';
        book_publisher = (obj.items[i].volumeInfo.publisher !== undefined) ? obj.items[i].volumeInfo.publisher: '';
        book_isbn = (obj.items[i].volumeInfo.industryIdentifiers !== undefined) ? obj.items[i].volumeInfo.industryIdentifiers[0].identifier: '';
        book_date = (obj.items[i].volumeInfo.publishedDate !== undefined) ? obj.items[i].volumeInfo.publishedDate.slice(0,4): '';
        shop  = checkAdd(obj.items[i].id) ? O_SHOP_BTN + obj.items[i].id + C_SHOP_BTN: "";
        likes = checkReg("curtidas", obj.items[i].id);
        comments = checkReg("comentarios", obj.items[i].id);

        document.getElementById("resposta").innerHTML +=  
        O_COVER_TAG + book_capa + C_COVER_TAG +
        O_AUTHOR_TAG + book_author + C_AUTHOR_TAG + 
        O_TITLE_LNK +  obj.items[i].id + O_TITLE_TAG +
        book_title + C_TITLE_TAG + book_date + O_PUB_TAG +
        book_publisher + ', ISBN: ' + book_isbn  + C_PUB_TAG +
        O_DESC_TAG + book_desc + C_DESC_TAG +
        O_LIKE_TAG + likes + C_LIKE_TAG +
        O_COMMENT_TAG + comments + C_COMMENT_TAG +
        O_POST_BTN + obj.items[i].id + C_POST_BTN +
        shop + C_4DIV_TAG;}
    }
}

function checkReg(type,id) {
    var url = ANYBOOK_API + type +"?book_id=" + id + "&status=1";

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    let jsn = JSON.parse(xhttp.responseText); 
    if(jsn.length>0){
        return jsn.length;
    }else{
        return 0;
    }
}

function checkAdd(id) {
    let v = checkReg("anuncios", id);
    if(v>0){
        return true;
    }else{
        return false;
    }
}