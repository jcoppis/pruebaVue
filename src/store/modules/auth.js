import { AuthInstance, Axios } from '../../axios-auth';
import router from '../../router';

const API_KEY =  'AIzaSyDJTXOu4aa-ulHi1ihzU-dzXac9ccBFUZg';

const state = () => ({
  token: null,
  userId: null
});

const mutations = {
  setUser(state, userData) {
    state.token = userData.token;
    state.userId = userData.userId;
  },
  clearUser(state) {
    state.token = null;
    state.userId = null;
  }
};

const actions = {
  async signup({ commit }, authData) {
    const data = {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    };

    try {
      const res = await AuthInstance.post(`/accounts:signUp?key=${API_KEY}`, data);
      const token = res.data.idToken;
      const userId = res.data.localId;

      const date = new Date();
      const expirationDate = date.getTime() + res.data.expiresIn * 1000;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expirationDate', expirationDate);

      Axios.defaults.headers.common['Authorization'] = token;
      commit('setUser', {
        token,
        userId,
      });
    } catch(err) {
      localStorage.removeItem('token');
      throw err;
    }
  },
  async login({ commit }, authData) {
    const data = {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    };

    try {
      const res = await AuthInstance.post(`/accounts:signInWithPassword?key=${API_KEY}`, data);
      const token = res.data.idToken;
      const userId = res.data.localId;

      const expirationDate = Date.now() + res.data.expiresIn * 1000;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expirationDate', expirationDate);

      Axios.defaults.headers.common['Authorization'] = token;
      commit('setUser', {
        token,
        userId,
      });
    } catch(err) {
      localStorage.removeItem('token');
      throw err;
    }
  },
  logout({ commit }) {
    commit('clearUser');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    delete Axios.defaults.headers.common['Authorization'];

    router.replace({ name: 'Login' });
  },
  tryAutoLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const expirationDate = localStorage.getItem('expirationDate');
    if (expirationDate < Date.now()) {
      dispatch('logout');
    }
    const userId = localStorage.getItem('userId');
    Axios.defaults.headers.common['Authorization'] = token;
    commit('setUser', {
      token,
      userId,
    });
  }
};

const getters = {
  user(state) {
    return state;
  },
  isLoggedIn(state) {
    return !!state.token;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};