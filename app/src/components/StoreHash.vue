<template>
	<form>
		<input type="text" v-model="hash" placeholder="Hash" />
		<button @click.prevent="onSubmit">Upload</button>
	</form>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "StoreHash",
		computed: {
			...mapGetters("drizzle", ["drizzleInstance"])
		},
		methods: {
			async onSubmit() {
				this.drizzleInstance.contracts.ProofOfExistence.methods.storeHash.cacheSend(
					this.hash
				);
			}
		},
		data: () => ({
			hash: ""
		})
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
