<template>
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
