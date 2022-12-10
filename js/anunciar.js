const GOOGLE_BOOK_API = "https://www.googleapis.com/books/v1/volumes/";
//const GOOGLE_BOOK_API = "https://www.googleapis.com/books/v1/volumes/zWNyDgAAQBAJ?key=AIzaSyBhTmP67mrRHyCfeW50fx1nTBwUIZFxTf8";
const API_KEY = "AIzaSyBhTmP67mrRHyCfeW50fx1nTBwUIZFxTf8";

var url_str = window.location.href;
var url = new URL(url_str);
var book_id = url.searchParams.get('book');

function getBook(q) {

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