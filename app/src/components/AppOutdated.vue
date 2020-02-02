<template>
	<v-dialog
		v-model="dialog"
		hide-overlay
		persistent
		width="100%"
		height="100%"
	>
		<v-card color="secondary2">
			<v-card-text class="text-center">
				<b class="background--text d-block pa-2"
					>App is outdated. Please
					<v-btn
						color="primary"
						href="https://github.com/mustafarefaey/PrivateStamp"
						>click here</v-btn
					>
					to find the latest version.</b
				>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: "AppOutdated",
		data: () => ({
			dialog: true
		})
	};
</script>
