const state = () => ({
  funds: 10000,
  stocks: []
});

const mutations = {
  buyStock(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(s => s.id === stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        quantity,
        id: stockId
      });
    }
    state.funds -= stockPrice * quantity;
  },
  sellStock(state, { stockId, quantity, stockPrice }) {
    const record = state.stocks.find(s => s.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }
    state.funds += stockPrice * quantity;
  },
  setPortfolio(state, { funds, stockPortfolio }) {
    state.funds = funds;
    state.stocks = stockPortfolio ?? [];
  }
};

const actions = {
  sellStock({ commit }, order) {
    commit('sellStock', order);
  }
};

const getters = {
  stockPortfolio(state, getters, rootState, rootGetters) {
    return state.stocks.map(s => {
      const record = rootGetters['stocks/stocks'].find(e => e.id === s.id);

      return {
        id: s.id,
        quantity: s.quantity,
        name: record.name,
        price: record.price
      };
    });
  },
  funds(state) {
    return state.funds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};