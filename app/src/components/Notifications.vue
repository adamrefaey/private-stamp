<template>
	<div></div>
</template>

<script>
	export default {
		mounted() {
			const contractEventHandler = ({ eventName, data }) => {
				let display = "";
				let subOptions = {
					duration: 5000,
					// you can pass a single action as below
					action: {
						text: "Close",
						onClick: (e, toastObject) => {
							toastObject.goAway(0);
						}
					},
					position: "top-center"
				};
				switch (eventName) {
					case "LogAdditionEvent":
						display += `<b>Success</b>: Your hash was stored in block #${data.blockNumber}.`;
						subOptions.duration = null;
						subOptions.type = "success";
						break;
				}
				this.$toasted.show(display, subOptions);
			};
			this.$drizzleEvents.$on("drizzle/contractEvent", payload => {
				contractEventHandler(payload);
			});
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
