import { defineStore } from 'pinia';
export const useContactStore = defineStore('contact', {
  state: () => ({
    viewDirection: '',
  }),

  actions: {
    setDirection(direction: string) {
      this.$patch({
        viewDirection: direction,
      });
    },
  },

  getters: {
    test: (state): string => {
      return state.viewDirection + '888888888';
    },
  },
});
