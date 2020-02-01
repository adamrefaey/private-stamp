<template>
	<v-stepper-step
		color="primary"
		:rules="[() => !error]"
		:step="stepNum"
		:complete="!error"
	>
		<v-btn
			v-if="downloadBtn"
			color="success"
			:download="downloadName"
			:href="downloadHref"
			>{{ downloadText }}</v-btn
		>
		<span v-if="error">{{ text }}</span>
		<span v-else>{{ text }}</span>

		<CopyableText v-if="copyCode" :text="copyCode" />
	</v-stepper-step>
</template>

<script>
	import CopyableText from "./CopyableText";
	export default {
		name: "Log",
		props: [
			"stepNum",
			"text",
			"error",
			"downloadBtn",
			"downloadText",
			"downloadName",
			"downloadHref",
			"copyCode"
		],
		components: {
			CopyableText
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
