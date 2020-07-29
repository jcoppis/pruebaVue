import stocks from '../../data/stocks';

const state = () => ({
  stocks: []
});

const mutations = {
  setStocks(state, stocks) {
    state.stocks = stocks;
  },
  rndStocks(state) {
    state.stocks.forEach(s => {
      const newPrice = Math.round((Math.random() + 0.5) * s.price);
      console.log(newPrice);
      s.price = newPrice;
    });
  }
};

const actions = {
  buyStock: ({ commit }, order) => {
    commit('portfolio/buyStock', order, { root: true });
  },
  setStocks: ({ commit }) => {
    commit('setStocks', stocks);
  },
  randomizeStocks: ({ commit }) => {
    commit('rndStocks');
  }
};

const getters = {
  stocks: (state) => state.stocks
}

export default {
  state,
  mutations,
  actions,
  getters
};