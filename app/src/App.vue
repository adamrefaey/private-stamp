<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>

				<v-img
					alt="Vuetify Name"
					class="shrink mt-1 hidden-sm-and-down"
					contain
					min-width="100"
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
					width="100"
				/>
			</div>

			<v-spacer></v-spacer>

			<v-btn
				href="https://github.com/vuetifyjs/vuetify/releases/latest"
				target="_blank"
				text
			>
				<span class="mr-2">Latest Release</span>
				<v-icon>mdi-open-in-new</v-icon>
			</v-btn>
		</v-app-bar>

		<v-content>
			<div v-if="isDrizzleInitialized" id="app">
				<Notifications />
				<div>
					<Account />
				</div>
				<div>
					<h3>Proof of existence:</h3>
					<StoreHash />
					<VerifyHash />
				</div>
			</div>
			<div v-else>Loading...</div>
		</v-content>
	</v-app>
</template>

<script>
	import { mapGetters } from "vuex";
	import Notifications from "./components/Notifications";
	import Account from "./components/Account";
	import VerifyHash from "./components/VerifyHash";
	import StoreHash from "./components/StoreHash";

	export default {
		name: "app",
		components: {
			Account,
			VerifyHash,
			StoreHash,
			Notifications
		},
		computed: mapGetters("drizzle", ["isDrizzleInitialized"])
	};
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
