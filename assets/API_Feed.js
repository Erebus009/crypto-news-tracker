const coinLIST = {BITCOIN: 1, ETHEREUM: 2, HEX: 5331, TETHER: 8, Cardano: 9, BINANCE_COIN: 14, SOLANA: 68905, 
TERRA: 62458, XRP: 3, POLKADOT: 71983, DOGECOIN: 20, USDC: 1760, USDC: 72821, AVALANCHE: 70974, BINANCE: 14066, CHAINLINK: 59,
LITECOIN: 7, ALGORAND: 14585, BITCOIN_CASH: 4, WRAPPED_BTC: 10607, COSMOS: 4966, POLYGON: 12606, AXIE_INFINITY: 76192,
INTERNET_COMPUTER: 73728, PANCAKESWAP: 73268, VECHAIN: 19, TEZOS: 18, FTX_TOKEN: 62569, SHIBA_INU: 72724,
DAI: 68589, STELLAR: 6, TRON: 11, ETHEREUM_CLASSIC: 16, FILECOIN: 74500, THETA_TOKEN: 96, COMPOUND_ETHER: 10825, MONERO: 10,
OKB: 1524, EOS: 5, HEDERA_HASHGRAPH: 63100, ELROND: 72208, AAVE: 74883,  AMP: 77558, CELSIUS_NETWORK: 4303,
LIDO_DAO_TOKEN: 78547, IOTA: 12, CONTENT_VALUE_NETWORK: 11170, KLAYTN: 63279, NEO: 15}


//this is the main object and constructor for the coin that is being searched from the API and used to build the elements of the we site
//this is created dynamically based on the coin being passed, must match a coin in the "coinLIST" object array
const coin = async (coinType, time = 0) => {

  //get the ID from the "coinList" array to match the format required by the API, can not search by just the name
  //bitcoin id = 1, Dogecoin = 20, etc.
    let coinAPI = "https://coinranking1.p.rapidapi.com/coin/" + coinLIST[coinType]
    
    //this checks to see if there is a time stamp passed and append it to the API url
    //the default is 0 if no param is passed to the function and the default search will be passed
    if (time != 0){
      coinAPI += "/history/" + time;
    }

    //pass the dynamic coin URL to the fetch function to return the results
    let coinDetails = await getCoin(coinAPI);

    //return the functions based on the param passed to the function
    //the default returns are based on time = 0, so no time param being used
    if (time === 0){
      return ({
        all: () => coinDetails,
        name: () => coinDetails.data.coin.name,
        symbol: () => coinDetails.data.coin.symbol,
        price: () => coinDetails.data.coin.price,
        icon_url: () => coinDetails.data.coin.iconUrl,
        change: () => coinDetails.data.coin.change,
        volume: () => coinDetails.data.coin.volume,
        history: () => coinDetails.data.coin.history,
        rank: () => coinDetails.data.coin.rank,
        highest: () => coinDetails.data.coin.allTimeHigh.price,
        name: () => coinDetails.data.coin.name,
        coinDesc:() => coinDetails.data.coin.description,
        link: () => coinDetails.data.coin.links[0].name,

      });

    }else{
      return ({
        all: () => coinDetails,
        change: () => coinDetails.data.change,
        history: () => coinDetails.data.history
      });

    }
 
};

//fetch request to get coin details, will return back to "coin" function
//url will change based on a dynamic reqest
async function getCoin(url){

  try {
    const response = await fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": "4a5a441082mshcb1b714a2823090p1a255ajsnf13ed5558b31"
      }
    })
    if(!response.ok){
      throw new Error(`API error! status: ${response.status}`);
    }else{
      const coinData = await response.json();
      return coinData;
    }

  }catch (error){
    console.log(error.message);
  }
  finally{
    //nothing here at this time
  }
  
}

const news = async (coinType) => {

  let newsAPI = ""//"https://bing-news-search1.p.rapidapi.com/news/search?q="+ coinType +"&count=1&mkt=en-US&freshness=Day&textFormat=Raw&safeSearch=Off";

  let coinNews = await getNews(newsAPI);

  return ({
      theNews: () => coinNews
  });

}

async function getNews(url){

  try{ 
    const response = await fetch(url, {
    "method": "GET",
    "headers": {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "ecab879069msh3fb5596539644cfp143c34jsnd780de433341"
    }
  })
    if(!response.ok){
      throw new Error(`API error! status: ${response.status}`);
    }else{
      const theNews = await response.json();
      return theNews;
    }
  }
  catch (error){
    console.log(error.message);
  }
  finally{
      //nothing here at this time
  }

}

