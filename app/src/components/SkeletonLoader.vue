<template>
	<v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
		<v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
	</v-sheet>
</template>

<script>
	export default {
		name: "SkeletonLoader",
		// Vuetify components provide
		// a theme variable that is
		// used to determine dark
		inject: ["theme"]
	};
</script>
