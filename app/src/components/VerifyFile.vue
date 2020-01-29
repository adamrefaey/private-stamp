<template>
	<form>
		<input type="file" />
		<button @click.prevent="onSubmit">Upload</button>
	</form>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "VerifyFile",
		computed: {
			...mapGetters("drizzle", ["drizzleInstance"])
		},
		methods: {
			async onSubmit() {}
		},
		data: () => ({})
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
