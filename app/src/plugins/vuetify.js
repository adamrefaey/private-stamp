import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: true,
		themes: {
			dark: {
				background: "#263238",
				surface: "#37474F",
				primary: "#00ACC1",
				secondary: "#E0F2F1",
				secondary2: "#009688",
				secondary3: "#ECEFF1"
			}
		}
	}
});
