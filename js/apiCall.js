// 1
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked;
document.querySelector("#searchSet").onclick = setSearchButtonClicked};
	
// 2
let displayTerm = "";

// Currently set to pick the set in the search box
function searchButtonClicked(){
    console.log("searchButtonClicked() called");

    let term = document.querySelector("#nameSearch").value;
    
    searchCard(term);
}

function setSearchButtonClicked(){
    console.log("setSearchButtonClicked() called");

    let term = document.querySelector("#setSearch").value;
    
    getSet(term);
}

function radioButtonClicked(){
    console.log("radioButtonClicked() called");

    let commonCB = document.querySelector("#Common");
    let rareCB = document.querySelector("#Rare");
    let epicCB = document.querySelector("#Epic");
    let legendary = document.querySelector("#Legendary");
}

function getSet(set="Classic"){
    set = set.trim();

    set = encodeURIComponent(set);

    if(set.length < 1) return;

    const BLIZZARD_URL = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/" + set;

    getData(BLIZZARD_URL);
}

function searchCard(card="wisp"){
    card = card.trim();

    card = encodeURIComponent(card);

    if(card.length < 1) return;

    const BLIZZARD_URL = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/" + card;

    getData(BLIZZARD_URL);
}

function getData(url){
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "fa9fb7142dmsh9fdc1344c4d46c5p11b649jsn97699a6a8d0f");
    xhr.send();
}

function dataLoaded(e){
    let xhr = e.target;

    console.log(xhr.responseText);

    let results = JSON.parse(xhr.responseText);

    if(!results.length || results.length == 0){
        document.querySelector("#status").innerHTML = "<b>No results found </b>";
        return;
    }

    console.log(results);
    bigString='';
    //console.log("results.length = " + results.length);
    //let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    let length = results.length;

    length > 200 ? length = 200 : length = results.length; 

    console.log(length);

    for(let i=0; i<length;i++){
        if(i > results.length - 1) break;

        let result = results[i];

        if(result.collectible != true) {
            length += 1;
            continue;
        }

        let smallURL = result.imgGold;

        let url = result.url;

        line = `<div class='card'><div class='title'><h4>${results[i].name}</h4></div>`
        line += `<div class='image'><img src='${smallURL}' onerror="this.onerror=null;this.src='../images/ImageNotFound.png';" title='${results[i].name}' /></div></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function dataError(e){
    console.log("An error occurred");
}
