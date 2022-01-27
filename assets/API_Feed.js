const coinLIST = { BITCOIN: "Qwsogvtv82FCd",
 ETHEREUM: "razxDUgYGNAdQ",
 TETHER_USD: "HIVsRcGKkPFtW",
 BINANCE_COIN: "WcwrkfNI4FUAe",
 HEX: "9K7m6ufraZ6gh",
 USDC: "aKzUVe4Hh_CON",
 CARDANO: "qzawljRxB5bYu",
 SOLANA: "zNZHO_Sjf",
 XRP: "-l8Mn2pVlRs-p",
 TERRA: "AaQUAs2Mc",
 POLKADOT: "25W7FG7om",
 DOGECOIN: "a91GCGd_u96cF",
 BINANCE_USD: "vSo2fu9iE1s0Y",
 AVALANCHE: "dvUj0CzDZ",
 SHIBA_INU: "xz24e0BjL",
 POLYGON: "uW2tk-ILY0ii",
 WRAPPED_BTC: "x4WXHge-vvFY",
 DAI: "MoTuySvg7",
 COSMOS: "Knsels4_Ol-Ny",
 LITECOIN: "D7B1x_ks7WhV5",
 CRYPTO_CHAIN: "65PHZTpmE55b",
 CHAINLINK: "VLqpJwogdhHNb",
 NEAR_PROTOCOL: "DCrsaMv68",
 UNISWAP: "_H5FVG9iW",
 ALGORAND: "TpHE2IShQw-sJ",
 TRON: "qUhEFk1I61atv",
 OKB: "PDKcptVnzJTmN",
 BITCOIN_CASH: "ZlZpzOJo43mIo",
 FTX_TOKEN: "NfeOYfNcl",
 DECENTRALAND: "tEf7-dnwV3BXS",
 STELLAR: "f3iaFeCKEmkaZ",
 HEDERA_HASHGRAPH: "jad286TjB",
 FANTOM: "uIEWfMFnQo9K_",
 LEO: "mqtUpyBxu8O8",
 VECHAIN: "FEbS54wxo4oIl",
 COMPOUND_ETHER: "p_GHkOeDNKw0",
 THETA_TOKEN: "B42IRxNtoYmwK",
 AXIE_INFINITY: "gpRKmM16k",
 KLAYTN: "M9bj_WrX",
 PANCAKESWAP: "ncYFcP709",
 THE_SANDBOX: "pxtKbG5rg",
 HELIUM: "rGDiacWtB",
 ETHEREUM_CLASSIC: "hnfQfsYfeIGUQ",
 ELROND: "omwkOTglq",
 FRAX: "KfWtaeV1W",
 MONERO: "3mVx2FX_iJFp5",
 COMPOUND_DAI: "lT__vMO7l",
 TEZOS: "fsIbGOEJWbzxG",
 INCH_TOKEN: "lD9digIOk",
 ALL: 's'}


//this is the main object and constructor for the coin that is being searched from the API and used to build the elements of the we site
//this is created dynamically based on the coin being passed, must match a coin in the "coinLIST" object array
const coin = async (coinType, time = 0) => {

  //get the ID from the "coinList" array to match the format required by the API, can not search by just the name
  //bitcoin id = 1, Dogecoin = 20, etc.
    let coinAPI = "https://coinranking1.p.rapidapi.com/coin/" + coinLIST[coinType] 
    
    //this checks to see if there is a time stamp passed and append it to the API url
    //the default is 0 if no param is passed to the function and the default search will be passed
    if (time != 0){
      coinAPI += "/history?timePeriod=" + time
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
        volume: () => coinDetails.data.coin['24hVolume'],
        history: () => coinDetails.data.coin.history,
        rank: () => coinDetails.data.coin.rank,
        highest: () => coinDetails.data.coin.allTimeHigh.price,
        coinDesc:() => coinDetails.data.coin.description,
        link: () => coinDetails.data.coin.links[0].name,
        symbol: () => coinDetails.data.coin.symbol,

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
        "x-rapidapi-key": "50e2e462f8msh7a5c1f25c65202ep1015a0jsn0a57f58b48d8"
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


  let newsAPI = "https://bing-news-search1.p.rapidapi.com/news/search?q="+ coinType + "+crypto+coin" + "&count=6&mkt=en-US&freshness=Day&textFormat=Raw&safeSearch=Off";


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
        "x-rapidapi-key": "50e2e462f8msh7a5c1f25c65202ep1015a0jsn0a57f58b48d8"
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

