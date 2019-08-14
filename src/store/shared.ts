import { ActionTree } from "vuex";
import { SharedState } from "@/types/shared";

export default {
  state: {
    loading: false,
    error: null
  },
  getters: {
    loading(state: SharedState) {
      return state.loading;
    },
    error(state: SharedState) {
      return state.error;
    }
  },
  mutations: {
    SET_LOADING: (state: SharedState, payload: boolean) => {
      state.loading = payload;
    },
    SET_ERROR: (state: SharedState, payload: string | null) => {
      state.error = payload;
    },
    CLEAR_ERROR: (state: SharedState) => {
      state.error = null;
    }
  },
  actions: {
    SET_LOADING({ commit }, payload) {
      commit("SET_LOADING", payload);
    },
    SET_ERROR({ commit }, payload) {
      commit("SET_ERROR", payload);
    },
    CLEAR_ERROR({ commit }) {
      commit("CLEAR_ERROR");
    }
  } as ActionTree<any, any>
};
