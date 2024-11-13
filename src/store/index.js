// src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    progress: 0,
    tempUserId: null,
    selectedDomainId: null,
    selectedOptionId: null, // Stores selected option from SkillLearning page
  },
  mutations: {
    updateProgress(state, progress) {
      state.progress = progress;
    },
    saveTempUserId(state, tempUserId) {
      state.tempUserId = tempUserId;
    },
    saveSelectedDomainId(state, domainId) {
      state.selectedDomainId = domainId;
    },
    saveSelectedOptionId(state, optionId) {
      state.selectedOptionId = optionId;
    },
  },
  actions: {
    updateProgress({ commit }, progress) {
      commit("updateProgress", progress);
    },
    saveTempUserId({ commit }, tempUserId) {
      commit("saveTempUserId", tempUserId);
    },
    saveSelectedDomainId({ commit }, domainId) {
      commit("saveSelectedDomainId", domainId);
    },
    saveSelectedOptionId({ commit }, optionId) {
      commit("saveSelectedOptionId", optionId);
    },
  },
  getters: {
    progress: (state) => state.progress,
    tempUserId: (state) => state.tempUserId,
    selectedDomainId: (state) => state.selectedDomainId,
    selectedOptionId: (state) => state.selectedOptionId,
  },
});
