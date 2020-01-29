<template>
	<div>
		<h4>Your address: {{ activeAccount }}</h4>
		<h4>Balance: {{ activeBalance }} Wei</h4>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "Account",
		computed: {
			...mapGetters("accounts", ["activeAccount", "activeBalance"])
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
