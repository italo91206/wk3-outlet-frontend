import LoginService from '../services/login/login-service.js';

const user = localStorage.getItem('user');

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return LoginService.fazerLogin(user).then(
        user => {
          if(user){
            commit('loginSuccess', user.data.data);
            return Promise.resolve(user);
          }
          else{
            commit('loginFailure');
            return Promise.reject(user);
          }
        }
      );
    },
    logout({ commit }) {
      // LoginService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return LoginService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, data) {
      let user  = data;
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};