<template>
	<v-card color="surface" class="secondary--text elevation-2">
		<v-card-title>
			<h2><v-icon>mdi-briefcase-upload</v-icon> Encrypt and Stamp</h2>
		</v-card-title>
		<v-card-text>
			<v-form>
				<v-file-input
					label="File"
					placeholder="Click here to upload your file."
					:show-size="true"
					:rules="[rules.required]"
					v-model="fileInput"
				></v-file-input>
				<v-text-field
					prepend-icon="mdi-lock"
					label="Password"
					placeholder="Type the password to be used in encrypting your file."
					v-model="password"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="[rules.required]"
					:type="showPassword ? 'text' : 'password'"
					@click:append="showPassword = !showPassword"
				></v-text-field>

				<v-btn
					class="cyan darken-4"
					:loading="isSaving"
					@click.prevent="onSubmit"
				>
					Stamp <v-icon right>mdi-stamper</v-icon>
				</v-btn>
			</v-form>

			<v-stepper
				v-if="log.length"
				v-model="log.length"
				vertical
				color="grey lighten-1"
				class="mt-5"
			>
				<Log
					v-for="item in log"
					v-bind:key="item.id"
					v-bind:stepNum="item.stepNum"
					v-bind:text="item.text"
					v-bind:error="item.error"
					v-bind:downloadBtn="item.downloadBtn"
					v-bind:downloadText="item.downloadText"
					v-bind:downloadName="item.downloadName"
					v-bind:downloadHref="item.downloadHref"
					v-bind:copyCode="item.copyCode"
				/>
			</v-stepper>
		</v-card-text>
	</v-card>
</template>

<script>
	import { mapGetters } from "vuex";
	import { encryptFile, urlFromBlob } from "../utils/files-encryption";
	import { addToIpfs } from "../utils/ipfs";
	import Log from "./Log";

	export default {
		name: "AddFile",
		components: { Log },
		computed: {
			...mapGetters("drizzle", ["drizzleInstance"])
		},
		mounted: function() {
			this.loadIpfsNode();
		},
		methods: {
			loadIpfsNode: async function() {
				try {
					this.ipfsNode = await this.$ipfs;
				} catch (error) {
					this.$toasted.error(error, {
						duration: 5000,
						// you can pass a single action as below
						action: {
							text: "Close",
							onClick: (e, toastObject) => {
								toastObject.goAway(0);
							}
						},
						position: "top-center"
					});
				}
			},
			addToLog: function(
				text = "",
				error = false,
				copyCode = null,
				downloadBtn = false,
				downloadText = null,
				downloadName = null,
				downloadHref = null
			) {
				this.log.push({
					stepNum: this.log.length + 1,
					text,
					error,
					copyCode,
					downloadBtn,
					downloadText,
					downloadName,
					downloadHref
				});
			},
			onSubmit: async function() {
				if (!this.fileInput || !this.password) {
					this.$toasted.error("File and password are required!", {
						duration: null,
						// you can pass a single action as below
						action: {
							text: "Close",
							onClick: (e, toastObject) => {
								toastObject.goAway(0);
							}
						},
						position: "top-center"
					});
					return;
				}
				this.isSaving = true;
				this.log = [];

				// encrypt the file
				this.addToLog("Started encrypting file...");
				encryptFile(this.fileInput, this.password)
					.then(async encryptedFile => {
						this.addToLog("Finished encrypting file successfully!");
						this.addToLog(
							"",
							false,
							null,
							true,
							"Save encrypted file",
							`Encrypted-${this.fileInput.name}`,
							urlFromBlob(encryptedFile)
						);

						// upload to ipfs
						this.addToLog("Started uploading file...");
						const hash = await addToIpfs(this.ipfsNode, encryptedFile);
						this.addToLog("Finished uploading file successfully!");
						this.addToLog(`File hash: `, false, hash);

						this.addToLog(
							"Request sending transaction to the blockchain..."
						);
						// store the ipfs hash on the blockchain
						try {
							await this.drizzleInstance.contracts.ProofOfExistence.methods.storeHash.cacheSend(
								hash
							);
						} catch (err) {
							this.addToLog(
								"Sending transaction to the blockchain failed!"
							);
						}

						this.isSaving = false;
					})
					.catch(err => {
						this.$toasted.error(err, {
							duration: 5000,
							// you can pass a single action as below
							action: {
								text: "Close",
								onClick: (e, toastObject) => {
									toastObject.goAway(0);
								}
							},
							position: "top-center"
						});

						this.isSaving = false;
					});
			}
		},
		data: () => ({
			fileInput: null,
			password: "",
			isSaving: false,
			showPassword: false,
			ipfsNode: null,
			log: [],

			rules: {
				required: value => !!value || "Required."
			}
		})
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
