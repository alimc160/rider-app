import { createApp } from 'vue';

import App from '@/App.vue';
const app = createApp(App);
import Vuex from 'vuex';
// Load Vuex
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';

app.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()]
});