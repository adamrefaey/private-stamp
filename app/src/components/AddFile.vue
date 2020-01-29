<template>
	<form>
		<input
			required
			type="file"
			@change="fileChange($event.target.files[0])"
		/>
		<input required type="text" v-model="password" placeholder="password" />

		<button :disabled="isSaving" @click.prevent="onSubmit">Upload</button>
	</form>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "AddFile",
		computed: {
			...mapGetters("drizzle", ["drizzleInstance"])
		},
		methods: {
			async onSubmit() {
				this.isSaving = true;
				// encrypt the file
				// upload to ipfs
				// get its ipfs hash
				// store the ipfs hash on the blockchain
				this.isSaving = false;
			}
		},
		data: () => ({
			password: "",
			isSaving: false
		})
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
