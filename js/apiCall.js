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

function checkboxFilter(e){
    console.log("checkboxFilter() called");

    let commonCheckbox = document.querySelector("#Common");
    let rareCheckbox = document.querySelector("#Rare");
    let epicCheckbox = document.querySelector("#Epic");
    let legendaryCheckbox = document.querySelector("#Legendary");
    
    let cardList = [];

    // First checks if no checkbox, or all checkboxes are checked
    // In this case, no filter will be applied
    if((commonCheckbox.checked == false) &&
        (rareCheckbox.checked == false) &&
        (epicCheckbox.checked == false) &&
        (legendaryCheckbox.checked == false)) 
        return e;

    // Loops through array, if the card rarity's checkbox
    // is checked, it will be added to the returned array
    for(let i = 0; i < e.length; i++)
    {
        switch(e[i].rarity)
        {
            case "Common":
                if(commonCheckbox.checked == true)
                    cardList.push(e[i]);
                break;
            case "Rare":
                if(rareCheckbox.checked == true)
                    cardList.push(e[i]);
                break;
            case "Epic":
                if(epicCheckbox.checked == true)
                    cardList.push(e[i]);
                break;
            case "Legendary":
                if(legendaryCheckbox.checked == true)
                    cardList.push(e[i]);
                break;
        }
    }

    return cardList;
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

    // Filters resulting list of cards by quality/rarity
    results = checkboxFilter(results);

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
        line += `<div class='image'><img src='${smallURL}' onerror="this.onerror=null;this.src='../images/ImageNotFound3.png';style='object-fit=none;';" title='${results[i].name}' /></div></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function dataError(e){
    console.log("An error occurred");
}
