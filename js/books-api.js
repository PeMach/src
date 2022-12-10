const search_catalog = async (nome_livro) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${nome_livro}&key=AIzaSyBhTmP67mrRHyCfeW50fx1nTBwUIZFxTf8`);
    const myJson = await response.json();
    console.log(myJson.items[0]);
}

async function search_by_book_isbn(isbn){
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyBhTmP67mrRHyCfeW50fx1nTBwUIZFxTf8`);
    const myJson = await request.json();
    return myJson.items[0];
}

function fazALgo(parametro1){
 // fazAlgo
}

 // api requests javascript
// const find_book_by_title ...