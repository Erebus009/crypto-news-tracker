let search_box = $("#coin_search")
let price = $('#price');
let coinName = $('#coin');
let volume = $('#volume');
let priceChange = $('#price-change');
let coinRank = $('#rank');
let highPrice = $('#high-price');
let CoinNameGraph = $('#coin-name-graph')
let icon = $('.icon');
let details = $('#details-coin')
let link = $('#Link')
let removeBtn = $('.delete')
let coinInfo = $('#coin-info-name')
let lastCoin = [];
let symbol = $('#symbol')
//these will be where all the data is stored when the site loads or a search is generated
let myCoinDetails;
let myCoinDetails24h;
let myCoinNews;
let allCoins;
//--------------------

async function coinMarquee() {

    allCoins =  await getCoin("https://coinranking1.p.rapidapi.com/coins/")

    for(let x = 0; x < allCoins.data.coins.length; x++){
        let $mainDIV = $("<li>");
        $mainDIV.attr("coin",allCoins.data.coins[x].name )

        let $coinIcon = $("<img>")
        $coinIcon.attr({
            src: allCoins.data.coins[x].iconUrl,
            width: "15px",
            height: "15px"
        })
        
        
        $mainDIV.text("  " +allCoins.data.coins[x].name + " " +
        Number.parseFloat(allCoins.data.coins[x].price).toLocaleString("en-US",{style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2})
        )

        let $changeSpan = $("<span>")
        $changeSpan.text(" (" + allCoins.data.coins[x].change + ")")
        allCoins.data.coins[x].change < 0 ? $($changeSpan ).attr("class","neg_trend") :
        $($changeSpan).attr("class","pos_trend");



        $mainDIV.prepend($coinIcon)
        $mainDIV.append($changeSpan)

        $("#webTicker").append($mainDIV)
    }

    $('#webTicker').webTicker({
        duplicate: true,
        startEmpty: true
    });

}

//the purpose of this function is to activate the API requests
//this is called both when the page loads and after user input
//once all calls are complete will call the function to load the remaining elements
async function getData(search_coin){
    
    //go fetch API for both the news and the coin details based on the 'search_coin'
    myCoinDetails = await coin(search_coin);
    myCoinDetails24h = await coin(search_coin, "24h")
    myCoinNews = await news(search_coin); 
    localStorage.setItem('coin', JSON.stringify(search_coin));
    loadPage();

}

//this is the primary function to load the elements of the page
function loadPage(){

    loadGraph();

    //function here to load the coin info
    populateTable();
    //fucntion to load previous coin searched.
    

    //function here to load the coin details

    //function here to load the cards
    
}

//this function builds and loads the graph showing the price change for the selected coin
//used data from the var myCoinDetails24h
function loadGraph(){

    let dataPoints = [];
    let timeStamps = [];
    let history = myCoinDetails24h.history();

    //add elements above the graph
    $("#coin_name").children("h1").text(myCoinDetails.name()) //add name
    $("#coin_name").children("img").attr("src",myCoinDetails.icon_url()) //add coin symbol
    $("#coin_price").children("p").text(Number.parseFloat(myCoinDetails.price()).toLocaleString("en-US",{style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2}))//add price
    $("#coin_price").children("span").text("(" + myCoinDetails.change() + "%)")//add % change

    //chang the color of the % change to highlight if pos or neg change
    myCoinDetails.change() < 0 ? $("#coin_price").children("span").attr("class","neg_trend") :
    $("#coin_price").children("span").attr("class","pos_trend");
    

    //build two arrays with the data pulled from the API
    //this is for the plot points and the x-axis (price and time stamp)
    for(let x = 0; x < history.length; x++){
        timeStamps.push("[" + moment(history[x].timestamp).format("HH:mm")+ "]");
        dataPoints.push(history[x].price)
    }

    //clear the old graph to make room for the new one
    $("#myChart").remove()
    $("#graph_box").append("<canvas id='myChart'><canvas>")


    //draw the chart on the site
    new Chart("myChart", {
        type: "line",
        
        title: {
            text: "Pricing for the last 24 hours",
            dockInsidePlotArea: true
        },
        data: {
            
          labels: timeStamps,
          datasets: [{
            fill: false,
            markerSize: 1,
            markerType: "none",
            backgroundColor: "#8FA6F7",
            // borderColor: "rgba(0,0,255,0.1)",
            data: dataPoints
          }]
        },
        options: {
            scales: {
                x:{
                    title: {
                        display: true,
                        text: "Locale Time"
                    }
                }
            },

            plugins: {
                legend: {display: false},
                title: {
                    display: true,
                    text: "Pricing for past 24 hours",
                    backgroundColor: "#CCD1DF",

                },
                tooltip: {
                    intersect: false,
                    yAlign: "bottom",
                    titleAlign: "center"
                }

            }
        }
      });

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
        $(search_box).parent().prepend("<p class='help temp'>Unable to find coin</p>")

        //after 3 seconds revert the input box back to normal state and remove the text hint
        setTimeout(() =>{
            $(search_box).attr("class","input is-info is-rounded");
            $("p").remove(".temp");
        },3000);

        //return null to stop any further actions
        return null;
    }

    $(search_box).val("");
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
    coinMarquee();
    //add if statement here about if a local key exists and load that instead of the default
    let coin = JSON.parse(localStorage.getItem('coin'))
    
    coin == undefined ? getData('BITCOIN') : getData(coin);

})();

function populateTable(){
    $('#info-box').removeClass('hide')
    details.text('')
    price.text(Number.parseFloat(myCoinDetails.price()).toLocaleString("en-US",{style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2}))  // Coin price for table
    coinRank.text(myCoinDetails.rank()); // Coin rank for table
    volume.text(myCoinDetails.volume().toLocaleString("en-US")); // Share volumes for coin on table
    priceChange.text(myCoinDetails.change() + "%") // change in price for coin last 24 hours.
    coinName.text(myCoinDetails.name()) // name of coin for table
    highPrice.text(Number.parseFloat(myCoinDetails.highest()).toLocaleString("en-US",{style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2})) // highest record price of coin for table 
    details.append(myCoinDetails.coinDesc()) // details about the coin. 
    link.text(myCoinDetails.link()); // Link to coin website in table. 
    link.attr('href', 'https://' + myCoinDetails.link()) // makes link clickable in table.
    coinInfo.text(myCoinDetails.name() + ' Info');
    symbol.text(myCoinDetails.symbol());
};



document.querySelector(".accordion").addEventListener("click", function() {

    var panel = this.nextElementSibling;
    panel.style.display === "block" ?  panel.style.display = "none" : panel.style.display = "block";

});



   

   
    

    





