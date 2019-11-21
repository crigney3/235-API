// 1
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked;
getSet();};
	
// 2
let displayTerm = "";

// 3
function searchButtonClicked(){
    console.log("searchButtonClicked() called");
    
    const BLIZZARD_URL = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/";
    //const BLIZZARD_KEY = "fa9fb7142dmsh9fdc1344c4d46c5p11b649jsn97699a6a8d0f";

    let url = BLIZZARD_URL;
    //url += "api_key=" + BLIZZARD_KEY;

    let term = document.querySelector("#setSearch").value;
    
    getSet(term);
}

function getSet(set="Classic"){
    set = set.trim();

    set = encodeURIComponent(set);

    if(set.length < 1) return;

    const BLIZZARD_URL = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/" + set;

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

    for(let i=0; i<results.length;i++){
        let result = results[i];

        if(result.collectible != true) continue;

        let smallURL = result.imgGold;
        if(!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;

        line = `<div class='title'><h4>${results[i].name}</h4>`
        line += `<div class='image'><img src='${results[i].imgGold}' title='${results[i].name}' />`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function dataError(e){
    console.log("An error occurred");
}
