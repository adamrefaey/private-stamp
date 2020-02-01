<template>
	<div right class="secondary--text">
		<b> Your address: </b> <CopyableText :text="activeAccount" />
		<v-divider class="mx-4" vertical></v-divider>
		<b> Balance: </b
		><v-chip class="pa-2 cyan darken-3" label
			>{{ activeBalance / Math.pow(10, 18) }}
			<b class="ml-2">Eth</b></v-chip
		>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import CopyableText from "./CopyableText";

	export default {
		name: "Account",
		computed: {
			...mapGetters("accounts", ["activeAccount", "activeBalance"])
		},
		components: {
			CopyableText
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
