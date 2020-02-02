<template>
	<v-app id="app">
		<v-content v-if="isDrizzleInitialized && appIsUpToDate">
			<v-container fluid>
				<Notifications />
				<v-row color="surface" dense class="elevation-5">
					<v-col xs="12" md="3">
						<v-btn
							class="ma-3"
							left
							color="cyan darken-3"
							target="_blank"
							href="https://github.com/mustafarefaey/PrivateStamp"
							>PrivateStamp</v-btn
						>
					</v-col>

					<v-col xs="12" md="9" class="text-right">
						<div class="d-inline-block text-left ma-3">
							<b> Your address: </b>
							<CopyableText :text="activeAccount" />
						</div>
						<div class="d-inline-block text-left ma-3">
							<b class=""> Balance: </b
							><v-chip class="cyan darken-3" label
								>{{ activeBalance / Math.pow(10, 18) }}
								<b class="ml-2">Eth</b></v-chip
							>
						</div>
					</v-col>
				</v-row>
				<v-row>
					<v-col xs="12" md="6">
						<AddFile />
					</v-col>
					<v-col xs="12" md="6">
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
	// import Account from "./components/Account";
	import VerifyHash from "./components/VerifyHash";
	import AddFile from "./components/AddFile";
	import SkeletonLoader from "./components/SkeletonLoader";
	import AppOutdated from "./components/AppOutdated";
	import { APP_VERSION } from "./appConfig";
	import CopyableText from "./components/CopyableText";

	export default {
		name: "app",
		components: {
			// Account,
			VerifyHash,
			AddFile,
			SkeletonLoader,
			Notifications,
			AppOutdated,
			CopyableText
		},
		computed: {
			...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
			...mapGetters("accounts", ["activeAccount", "activeBalance"])
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