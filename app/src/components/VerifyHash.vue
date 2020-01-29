<template>
	<form>
		<h4 v-show="result > 0">Verified! Block number: {{ result }}</h4>
		<h4 v-show="result == 0">Unverified</h4>

		<input
			type="text"
			v-model="hashUploader"
			placeholder="Hash uploader's address"
		/>
		<input type="text" v-model="hash" placeholder="Hash" />
		<button @click.prevent="onSubmit">Verify</button>
	</form>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "VerifyHash",
		computed: {
			...mapGetters("drizzle", ["drizzleInstance"])
		},
		methods: {
			async onSubmit() {
				const tx = this.drizzleInstance.contracts.ProofOfExistence.methods
					.verifyHash(this.hashUploader, this.hash)
					.call();

				this.result = await tx;
			}
		},
		data: () => ({
			hashUploader: "",
			hash: "",
			result: -1
		})
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
