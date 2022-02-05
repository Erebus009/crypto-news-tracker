const coinLIST = {
  BITCOIN: "Qwsogvtv82FCd",
  ETHEREUM: "razxDUgYGNAdQ",
  TETHERUSD: "HIVsRcGKkPFtW",
  BINANCECOIN: "WcwrkfNI4FUAe",
  HEX: "9K7m6ufraZ6gh",
  USDC: "aKzUVe4Hh_CON",
  SOLANA: "zNZHO_Sjf",
  CARDANO: "qzawljRxB5bYu",
  XRP: "-l8Mn2pVlRs-p",
  POLKADOT: "25W7FG7om",
  TERRA: "AaQUAs2Mc",
  DOGECOIN: "a91GCGd_u96cF",
  AVALANCHE: "dvUj0CzDZ",
  BINANCEUSD: "vSo2fu9iE1s0Y",
  BITDAO: "N2IgQ9Xme",
  SHIBAINU: "xz24e0BjL",
  POLYGON: "uW2tk-ILY0ii",
  WRAPPEDBTC: "x4WXHge-vvFY",
  DAI: "MoTuySvg7",
  COSMOS: "Knsels4_Ol-Ny",
  LITECOIN: "D7B1x_ks7WhV5",
  "CRYPTO.COMCHAIN": "65PHZTpmE55b",
  CHAINLINK: "VLqpJwogdhHNb",
  NEARPROTOCOL: "DCrsaMv68",
  UNISWAP: "_H5FVG9iW",
  SENSO: "ZO4D7EBy3",
  TRON: "qUhEFk1I61atv",
  ALGORAND: "TpHE2IShQw-sJ",
  DECENTRALAND: "tEf7-dnwV3BXS",
  FTXTOKEN: "NfeOYfNcl",
  WEMIXTOKEN: "08CsQa-Ov",
  BITCOINCASH: "ZlZpzOJo43mIo",
  BLOKTOPIA: "sfab31CXM",
  OKB: "PDKcptVnzJTmN",
  LIDOSTAKEDETHER: "VINVMYf0u",
  HEDERAHASHGRAPH: "jad286TjB",
  LEO: "mqtUpyBxu8O8",
  "INTERNETCOMPUTER(DFINITY)": "aMNLwaUbY",
  STELLAR: "f3iaFeCKEmkaZ",
  THESANDBOX: "pxtKbG5rg",
  VECHAIN: "FEbS54wxo4oIl",
  FANTOM: "uIEWfMFnQo9K_",
  COMPOUNDETHER: "p_GHkOeDNKw0",
  TEZOS: "fsIbGOEJWbzxG",
  ETHEREUMCLASSIC: "hnfQfsYfeIGUQ",
  AXIEINFINITY: "gpRKmM16k",
  ELROND: "omwkOTglq",
  THETATOKEN: "B42IRxNtoYmwK",
  GERACOIN: "o-c5MkMCx",
  PANCAKESWAP: "ncYFcP709",
  MONERO: "3mVx2FX_iJFp5",
  HELIUM: "rGDiacWtB",
  KLAYTN: "M9bj_WrX",
  MAGICINTERNETMONEY: "lORNHeWV9",
  FRAX: "KfWtaeV1W",
  "1INCHTOKEN": "lD9digIOk",
  IOTA: "LtWwuVANwRzV_",
  COMPOUNDDAI: "lT__vMO7l",
  OSMOSIS: "yecsF9VkR",
  EOS: "iAzbfXiBBKkR6",
  AMP: "7oCgI0fI3",
  HARMONY: "XtW6kus088In",
  AAVE: "ixgUfzmLR",
  MAKER: "qFakph2rpuMOL",
  TERRAUSD: "cKExCczgV",
  FLOW: "QQ0NCmjVq",
  GALA: "zfVt1uA3P",
  FILECOIN: "ymQub4fuB",
  WOOTRADE: "k-J3YwacF",
  CELSIUSNETWORK: "rk5XwL6mIjUDp",
  BITCOINSV: "VcMY11NONHSA0",
  ARWEAVE: "7XWg41D1",
  HUOBIBTC: "upmyKdAQ",
  KUSAMA: "ePlOuwd_e",
  LIDODAOTOKEN: "Pe93bIOD2",
  NEO: "cVaOmQWainv7g",
  ZCASH: "aRGRWLf2RYNq4",
  ECASH: "aQx_vW8s1",
  CURVEDAOTOKEN: "QGbUTVMjG",
  RAVENCOIN: "Ru56fDlLB56-v",
  THEGRAPH: "qhd1biQ7M",
  HUOBITOKEN: "DXwP4wF9ksbBO",
  KUCOINTOKEN: "LOO6LmXd7G84Z",
  ENJINCOIN: "hG9iQlgtdwCvc",
  STACKS: "mMPrMcB7",
  NEXO: "Hi6jNXshVh9FA",
  CONVEXFINANCE: "sQ77akpUH",
  BASICATTENTIONTOKEN: "pOnT-qfd-RN7W",
  WAXECONOMICTOKEN: "Zn0_0EpSb",
  UNITPAYMENTINTERNATIONAL: "yl8ZR2fsxHPs",
  QUANT: "bauj_21eYVwso",
  CELO: "RLzoWH76m",
  FRAXSHARE: "3nNpuxHJ8",
  CHILIZ: "GSCt2y6YSgO26",
  ECOMI: "_xNnBDfLq2pF5",
  ONE: "6Lga5NiXX3rT",
  TRUEUSD: "1ZZI6g5k5royD",
  MOBILECOIN: "IMmiXaCp0",
  SYNTHETIXNETWORK: "sgxZRXbK0FDc",
  JUNO: "TZHFJDasH",
};




//this is the main object and constructor for the coin that is being searched from the API and used to build the elements of the we site
//this is created dynamically based on the coin being passed, must match a coin in the "coinLIST" object array
const coin = async (coinType, time = 0) => {
  //get the ID from the "coinList" array to match the format required by the API, can not search by just the name
  
  let coinAPI =  "https://coinranking1.p.rapidapi.com/coin/" + coinLIST[coinType];

  //this checks to see if there is a time stamp passed and append it to the API url
  //the default is 0 if no param is passed to the function and the default search will be passed
  if (time != 0) {
    coinAPI += "/history?timePeriod=" + time;
  }

  //pass the dynamic coin URL to the fetch function to return the results
  let coinDetails =  await getCoin(coinAPI);

  //return the functions based on the param passed to the function
  //the default returns are based on time = 0, so no time param being used
  if (time === 0) {
    return {
      all: () => coinDetails,
      name: () => coinDetails.data.coin.name,
      symbol: () => coinDetails.data.coin.symbol,
      price: () => coinDetails.data.coin.price,
      icon_url: () => coinDetails.data.coin.iconUrl,
      change: () => coinDetails.data.coin.change,
      volume: () => coinDetails.data.coin["24hVolume"],
      history: () => coinDetails.data.coin.history,
      rank: () => coinDetails.data.coin.rank,
      highest: () => coinDetails.data.coin.allTimeHigh.price,
      coinDesc: () => coinDetails.data.coin.description,
      link: () => coinDetails.data.coin.links[0].name,
      symbol: () => coinDetails.data.coin.symbol,
    };
  } else {
    return {
      all: () => coinDetails,
      change: () => coinDetails.data.change,
      history: () => coinDetails.data.history,
    };
  }
};

//fetch request to get coin details, will return back to "coin" function
//url will change based on a dynamic reqest
async function getCoin(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": "50e2e462f8msh7a5c1f25c65202ep1015a0jsn0a57f58b48d8",
      },
    });

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    } else {
      const coinData = await response.json();
      return coinData;
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    //nothing here at this time
  }
}

const news = async (coinType) => {
  let newsAPI =
    "https://bing-news-search1.p.rapidapi.com/news/search?q=" +
    coinType +
    "+crypto+coin" +
    "&count=6&mkt=en-US&freshness=Day&textFormat=Raw&safeSearch=Off";

  let coinNews = await getNews(newsAPI);

  return {
    theNews: () => coinNews,
  };
};

async function getNews(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "50e2e462f8msh7a5c1f25c65202ep1015a0jsn0a57f58b48d8",
      },
    });
    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    } else {
      const theNews = await response.json();
      return theNews;
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    //nothing here at this time
  }
}
