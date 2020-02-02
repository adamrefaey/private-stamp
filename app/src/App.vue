<template>
	<v-app id="app">
		<v-content v-if="isDrizzleInitialized && appIsUpToDate">
			<v-app-bar color="surface" dense class="elevation-5">
				<v-toolbar-title
					><v-btn
						color="cyan darken-3"
						target="_blank"
						href="https://github.com/mustafarefaey/PrivateStamp"
						>PrivateStamp</v-btn
					></v-toolbar-title
				>

				<v-spacer></v-spacer>
				<Account class="text-right" />
			</v-app-bar>
			<v-container fluid>
				<Notifications />
				<v-row wrap>
					<v-col cols="6">
						<AddFile />
					</v-col>
					<v-col cols="6">
						<VerifyHash />
					</v-col>
				</v-row>
			</v-container>
		</v-content>
		<v-container v-else-if="isDrizzleInitialized && !appIsUpToDate"
			><AppOutdated
		/></v-container>
		<v-container v-else><SkeletonLoader /></v-container>
	</v-app>
</template>

<script>
	import { mapGetters } from "vuex";
	import Notifications from "./components/Notifications";
	import Account from "./components/Account";
	import VerifyHash from "./components/VerifyHash";
	import AddFile from "./components/AddFile";
	import SkeletonLoader from "./components/SkeletonLoader";
	import AppOutdated from "./components/AppOutdated";
	import { APP_VERSION } from "./appConfig";

	export default {
		name: "app",
		components: {
			Account,
			VerifyHash,
			AddFile,
			SkeletonLoader,
			Notifications,
			AppOutdated
		},
		computed: {
			...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"])
		},
		mounted: function() {
			if (this.isDrizzleInitialized) {
				this.drizzleInstance.contracts.ProofOfExistence.methods
					.getAppVersion()
					.call()
					.then(appVersion => {
						console.log(`appVersion: ${appVersion}`);
						//compare
						if (appVersion != APP_VERSION) {
							this.appIsUpToDate = false;
						}
					});
			}
		},
		data: () => ({
			appIsUpToDate: true
		})
	};
</script>
<style scoped>
	#app {
		background-color: #263238;
		color: #b2dfdb;
	}
</style>