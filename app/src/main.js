import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import drizzleVuePlugin from "@drizzle/vue-plugin";
import drizzleOptions from "./drizzleOptions";
import vuetify from "./plugins/vuetify";
import VueIpfs from "./plugins/vue-ipfs";
import Toasted from "vue-toasted";

// Register Vuex
Vue.use(Vuex);

// Create and configure your Vuex Store
const store = new Vuex.Store({ state: {} });

// Load our IPFS plugin.
Vue.use(VueIpfs);

// Register the drizzleVuePlugin
Vue.use(drizzleVuePlugin, { store, drizzleOptions });

// Register Toasted
Vue.use(Toasted);

Vue.config.productionTip = false;

new Vue({
	store,
	vuetify,
	render: h => h(App)
}).$mount("#app");
