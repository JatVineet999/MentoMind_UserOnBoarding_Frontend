// src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    progress: 25,
    tempUserId: null,
    selectedDomainId: null,
    selectedOptionId: null,
    deviceId: null,
    mobileCountryCode: null,
    mobileCountry: null,
    mobileNumber: null,
    name: null,
  },
  mutations: {
    updateProgress(state, progress) {
      state.progress = progress;
    },
    saveDeviceId(state, deviceId) {
      state.deviceId = deviceId;
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
    saveUserInfo(
      state,
      { mobileCountryCode, mobileCountry, mobileNumber, name }
    ) {
      state.mobileCountryCode = mobileCountryCode;
      state.mobileCountry = mobileCountry;
      state.mobileNumber = mobileNumber;
      state.name = name;
    },
  },
  actions: {
    updateProgress({ commit }, progress) {
      commit("updateProgress", progress);
    },
    saveDeviceId({ commit }, deviceId) {
      commit("saveDeviceId", deviceId);
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
    saveUserInfo({ commit }, userInfo) {
      commit("saveUserInfo", userInfo);
    },
  },
  getters: {
    progress: (state) => state.progress,
    tempUserId: (state) => state.tempUserId,
    selectedDomainId: (state) => state.selectedDomainId,
    selectedOptionId: (state) => state.selectedOptionId,
    deviceId: (state) => state.deviceId,
    mobileCountryCode: (state) => state.mobileCountryCode,
    mobileCountry: (state) => state.mobileCountry,
    mobileNumber: (state) => state.mobileNumber,
    name: (state) => state.name,
  },
});
