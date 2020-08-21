import { Axios } from '../axios-auth';

export const loadData = async ({ commit, rootGetters }) => {
  const token = rootGetters['auth/user'].token;
  const response = await Axios.get(`/data.json?auth=${token}`);

  // VER poner 200 o algo asi
  if(response) {
    const data = response.data;

    const stocks = data.stocks;
    const funds = data.funds;
    const stockPortfolio = data.stockPortfolio;

    const portfolio = {
      funds,
      stockPortfolio
    };

    commit('stocks/setStocks', stocks);
    commit('portfolio/setPortfolio', portfolio);
  }
};

export const saveData = async ({ rootGetters }, data) => {
  const token = rootGetters['auth/user'].token;
  await Axios.put(`/data.json?auth=${token}`, data);
};