<template>
	<kbd class="d-inline-block cyan darken-3">
		<v-tooltip
			bottom
			v-model="showToolTip"
			:open-on-hover="false"
			:internal-activator="true"
		>
			<template v-slot:activator="{ on }">
				<span @click="doCopy" v-on="on">{{ text }}</span>
			</template>
			<span v-show="showToolTip">Copied!</span>
		</v-tooltip>
		<v-btn small color="accent-4" right icon @click="doCopy">
			<v-icon small>mdi-content-copy</v-icon>
		</v-btn></kbd
	>
</template>

<script>
	export default {
		name: "CopyableText",
		methods: {
			doCopy: function() {
				this.showToolTip = true;
				this.$copyText(this.text);
				setTimeout(() => {
					this.showToolTip = false;
				}, 1000);
			}
		},
		data: () => ({
			showToolTip: false
		}),
		props: ["text"]
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
