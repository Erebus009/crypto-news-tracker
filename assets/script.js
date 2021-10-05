let search_box = $("#coin_search")

//these will be where all the data is stored when the site loads or a search is generated
let myCoinDetails;
let myCoinNews;
//--------------------


//the purpose of this function is to activate the API requests
//this is called both when the page loads and after user input
//once all calls are complete will call the function to load the remaining elements
async function getData(search_coin){

    myCoinDetails = await coin(search_coin);
    myCoinNews = await news(search_coin); 

    loadPage();

}

function loadPage(){

    console.log(myCoinDetails.all());
    console.log(myCoinNews.theNews());

    //function here to build the graph

    //function here to load the coin info

    //function here to load the coin details

    //function here to load the cards

}





//this function will take the user unput from the search field and check if the input is a coin we have access too
//this is done by checking if the input is in the object array in API_Feed.js
function checkInput(search_item){
    //convert the user input to all uppdercase
    let search_coin = search_item.toUpperCase();
    //trim any white space, just in case
    search_coin =  search_coin.trim();
    //then turn remaining spaces to "_", this is because the object array keys can not have spaces in them
    search_coin = search_coin.replace(" ","_");
    
    

    //check to see if the coin matches one in the array
    if(!(search_coin in coinLIST)){
        //if this check fails it will highlight the search box red
        $(search_box).attr("class","input is-danger");
        //show a text hint that the search was unsuccessfull
        $(search_box).parent().prepend("<p class='help is-danger temp'>Unable to find coin</p>")

        //after 3 seconds revert the input box back to normal state and remove the text hint
        setTimeout(() =>{
            $(search_box).attr("class","input is-normal");
            $("p").remove(".temp");
        },3000);

        //return null to stop any further actions
        return null;
    }

    //call main load function to load the page
    getData(search_coin);

}

//when the user types something into the search box and hits enter,
//grab that value and call "checkInput" to see if it is a valid coin (that we have access too)
$("#search_box").on("submit", event => {
    event.preventDefault();  
    checkInput(search_box.val());
});


//this will load bitcoin as the defult coin when the pages loads
//this will allow something to load on the page right when it loads 
//the user can later search for another coin if they like
//will also load the last viewed coin if the user returns
(function(){
    //add if statement here about if a local key exists and load that instead of the default
    getData("BITCOIN");
})();

