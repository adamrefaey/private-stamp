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
				<b class="background--text d-block pa-2">Please stand by</b>
				<v-progress-linear
					indeterminate
					color="background"
					class="mb-0"
				></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: "SkeletonLoader",
		data: () => ({
			dialog: true
		})
	};
</script>
