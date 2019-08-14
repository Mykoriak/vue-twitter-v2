import Api from "@/api";
import { ActionTree } from "vuex";
import { TokenState } from "@/types/user";

export default {
  state: {
    token: localStorage.getItem("user-token") || ""
  },
  getters: {
    isAuthenticated: (state: TokenState) => !!state.token
  },
  mutations: {
    AUTH_SUCCESS: (state: TokenState, token: string) => {
      state.token = token;
    },
    AUTH_LOGOUT: (state: TokenState) => {
      state.token = "";
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      var basicAuth = "Basic " + btoa(user.email + ":" + user.password);
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit("SET_LOADING", true);
        Api.post(
          "auth/signin",
          {},
          {
            headers: { Authorization: basicAuth }
          }
        )
          .then(resp => {
            if (resp.data.success) {
              const token = resp.data.token;
              localStorage.setItem("user-token", token); // store the token in localstorage
              commit("AUTH_SUCCESS", token);
              commit("SET_LOADING", false);
              commit("CLEAR_ERROR");
              // you have your token, now log in your user :)
              resolve(resp);
            } else {
              commit("SET_ERROR", resp.data.message);
            }
          })
          .catch(err => {
            commit("SET_ERROR", err);
            commit("SET_LOADING", false);
            localStorage.removeItem("user-token"); // if the request fails, remove any possible user token if possible
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        commit("AUTH_LOGOUT");
        localStorage.removeItem("user-token"); // clear your user's token from localstorage
        resolve();
      });
    },
    REGISTER: ({ commit }, userData) => {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit("SET_LOADING", true);
        Api.post("auth/signup", userData)
          .then(resp => {
            if (resp.data.success) {
              commit("SET_LOADING", false);
              resolve(true);
            } else {
              commit("SET_ERROR", resp.data.message);
            }
          })
          .catch(err => {
            commit("SET_ERROR", err);
            commit("SET_LOADING", false);
            reject(err);
          });
      });
    }
  } as ActionTree<any, any>
};
