'use strict';
const GOOGLE_BOOK_API = "https://www.googleapis.com/books/v1/volumes/";
const ANYBOOK_API = "http://anybook.valdeirmendes.com:3000/";
const API_KEY = "AIzaSyBhTmP67mrRHyCfeW50fx1nTBwUIZFxTf8";
const loader = document.getElementById("loader");

const O_COVER_TAG = '<div class="row col-md-12 mb-3"> <div class="cover col-auto img-fluid"> <img src="';
const C_COVER_TAG = '" alt="Capa"></div>';
const O_CONDITION_TAG = '<div class="col-md-9 card-body"><div><span class="mr-2 badge';
const O_TYPE_TAG = '</span><span class="badge';
const C_CONDITION_TAG = '</span></div>';
const O_AUTHOR_TAG = '<strong class="d-inline-block mb-2 text-secundary">';
const C_AUTHOR_TAG = '</strong>';
const O_TITLE_LNK = '<a href="/detalhes_anuncio.html?id=';
const O_TITLE_TAG = '"><h5 class="mb-0">';
const C_TITLE_TAG = '</h5></a>';
const O_PRICE_TAG = '<h3 class="mb-1 text-secundary">R$ ';
const C_PRICE_TAG = '</h3>';
const O_DESC_TAG = '<p class="card-text text-muted mb-2">';
const C_DESC_TAG = '</p><div>';
const O_COMMENT_TAG ='<strong class="mr-3"><i class="fa fa-lg fa-comments text-warning"></i> ';
const C_COMMENT_TAG ='</strong>';
const O_DETAILS_BTN = '<a href="/detalhes_anuncio.html?id=';
const C_DETAILS_BTN = '" class="btn-primary-sm ml-1">Vizualizar</a>';
const C_4DIV_TAG = '</div></div></div></div>';


var book_capa, book_author, comments, book, book_id, book_title, book_description, badge_type, badge_condition, spl_tag;

var url = ANYBOOK_API + 'anuncios?_sort=id&_order=desc';

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();

var obj = JSON.parse(xhttp.responseText); 

for (let i = 0; i < obj.length; i++) {

    book_id =(obj[i].book_id)? obj[i].book_id : '';
    book = getBook(book_id);
    book_capa = ((book.imageLinks) ? book.imageLinks.thumbnail: "../images/book_thumb.png");
    book_author = (book.authors !== undefined) ? book.authors: obj[i].author;
    book_title = (book.title) ? book.title: obj[i].title;
    book_description = (book.description) ? book.authors: obj[i].description;
    comments = checkReg("comentarios", obj[i].id, 0);
    badge_condition = (obj[i].condition == 'Novo')  ? 'primary':'warning';
    spl_tag = (obj[i].special_ed)?'<div><i class="mr-2 fa fa-lg fa-bookmark text-primary"></i>':'<div>';
    
    switch (obj[i].type) {
        case 'Interesse':
            badge_type= 'success'
          break;
        case 'Troca':
            badge_type= 'warning'
          break;
        default:
            badge_type= 'primary'
    }
    document.getElementById("resposta").innerHTML +=  
    O_COVER_TAG + book_capa + C_COVER_TAG + 
    O_CONDITION_TAG + ` badge-${badge_condition}">` + obj[i].condition + O_TYPE_TAG  + ` badge-${badge_type}">` +
    obj[i].type + C_CONDITION_TAG + 
    O_AUTHOR_TAG + book_author + C_AUTHOR_TAG + 
    O_TITLE_LNK + obj[i].id + O_TITLE_TAG +
    book_title + C_TITLE_TAG +
    O_PRICE_TAG + obj[i].price + C_PRICE_TAG +
    O_DESC_TAG + obj[i].details.slice(0,300) + '...' + C_DESC_TAG +
    spl_tag + O_COMMENT_TAG + comments + C_COMMENT_TAG +
    O_DETAILS_BTN + obj[i].id + C_DETAILS_BTN +
    C_4DIV_TAG
    ;
}

loader.style.display = "none";


function checkReg(type,id, tag) {
    var url = ANYBOOK_API + type +"?ad_id=" + id + "&status=1" + "&tag=" + tag;

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

function getBook(id) {
    var url = GOOGLE_BOOK_API + id + '?key=' + API_KEY;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    let jsn = JSON.parse(xhttp.responseText); 
    if(jsn.volumeInfo){
        return jsn.volumeInfo;
    }else{
        return false;
    }
}





