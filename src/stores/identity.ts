import type { IJWTResponse } from "../domain/IJWTRepsonse";
import { defineStore } from "pinia";

export const useIdentityStore = defineStore({
  id: "identity",
  state: () => ({
    jwt: null as IJWTResponse | null
  }),
  getters: {
  },
  actions: {
  },
});
