export const loadData = async ({ commit }) => {
  const response = await (fetch('https://vuejs-stock-trader-eca7a.firebaseio.com/data.json').then(res => res.json()));

  if(response) {
    const stocks = response.stocks;
    const funds = response.funds;
    const stockPortfolio = response.stockPortfolio;

    const portfolio = {
      funds,
      stockPortfolio
    };

    commit('stocks/setStocks', stocks);
    commit('portfolio/setPortfolio', portfolio);
  }
};