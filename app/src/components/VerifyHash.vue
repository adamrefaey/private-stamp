<template>
	<v-card color="surface" class="secondary--text elevation-2">
		<v-card-title>
			<h2><v-icon>mdi-briefcase-check</v-icon> Verify and Decrypt</h2>
		</v-card-title>
		<v-card-text>
			<v-form>
				<v-text-field
					prepend-icon="mdi-pound"
					v-model="stampper"
					:rules="[rules.required]"
					label="Stampper"
					placeholder="Type the stampper's address."
				></v-text-field>
				<v-text-field
					prepend-icon="mdi-folder-pound"
					v-model="hash"
					:rules="[rules.required]"
					label="Hash"
					placeholder="Type the hash of the file."
				></v-text-field>

				<v-btn
					class="cyan darken-4"
					:loading="isVerifying"
					@click.prevent="onSubmit"
				>
					Verify <v-icon right>mdi-briefcase-search</v-icon>
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

			<v-card-text
				v-if="downloadable || downloadedFile"
				color="grey lighten-1"
			>
				<v-btn v-if="downloadable" color="success" @click="download"
					>Download file</v-btn
				>
				<v-form v-if="downloadedFile">
					<v-text-field
						prepend-icon="mdi-lock"
						label="Password"
						placeholder="Type the password used in encrypting the file."
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						@click:append="showPassword = !showPassword"
					></v-text-field>
					<v-btn color="success" @click="decrypt">Decrypt file</v-btn>
				</v-form>
			</v-card-text>
		</v-card-text>
	</v-card>
</template>

<script>
	import { mapGetters } from "vuex";
	import Log from "./Log";
	import { decryptFile, urlFromBlob } from "../utils/files-encryption";
	import { getFromIpfs } from "../utils/ipfs";

	export default {
		name: "VerifyHash",
		components: { Log },
		mounted: function() {
			this.createIpfsNode();
		},
		computed: {
			...mapGetters("drizzle", ["drizzleInstance"])
		},
		methods: {
			createIpfsNode: async function() {
				try {
					// Await for ipfs node instance.
					this.ipfsNode = await this.$ipfs;

					// Set successful status text.
					this.$toasted.success("Connected to IPFS =)", {
						duration: 2000,
						// you can pass a single action as below
						action: {
							text: "Close",
							onClick: (e, toastObject) => {
								toastObject.goAway(0);
							}
						},
						position: "top-right"
					});
				} catch (err) {
					this.$toasted.error(
						"Couldn't connect to IPFS, hence won't be able to upload the file!",
						{
							duration: null,
							// you can pass a single action as below
							action: {
								text: "Close",
								onClick: (e, toastObject) => {
									toastObject.goAway(0);
								}
							},
							position: "top-center"
						}
					);
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
			async onSubmit() {
				if (!this.hash || !this.stampper) {
					this.$toasted.error(
						"Stampper's address and file's hash are required!",
						{
							duration: null,
							// you can pass a single action as below
							action: {
								text: "Close",
								onClick: (e, toastObject) => {
									toastObject.goAway(0);
								}
							},
							position: "top-center"
						}
					);
					return;
				}

				// reset related state variables
				this.log = [];
				this.downloadedFile = null;
				this.downloadable = false;

				this.isVerifying = true;

				const result = await this.drizzleInstance.contracts.ProofOfExistence.methods
					.verifyHash(this.stampper, this.hash)
					.call();
				if (result > 0) {
					this.addToLog(`Verified! Block number: #${result}`);
					this.downloadable = true;
				} else {
					this.addToLog("Unverified", true);
				}

				this.isVerifying = false;
			},
			async download() {
				this.logActions = 1;
				this.addToLog("Started downloading the file...");
				this.downloadedFile = await getFromIpfs(this.ipfsNode, this.hash);
				this.addToLog("Finished downloading the file successfully!");
				this.downloadable = false;
			},
			async decrypt() {
				this.addToLog("Started decrypting file...");
				decryptFile(this.downloadedFile, this.password)
					.then(async decryptedFile => {
						this.downloadedFile = null;
						this.addToLog(
							"",
							false,
							null,
							true,
							"Save decrypted file",
							`Decrypted-file`,
							urlFromBlob(decryptedFile)
						);
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
						this.addToLog(
							"",
							false,
							null,
							true,
							"Save decrypted file",
							`Decrypted-file`,
							urlFromBlob(err)
						);
					});
			}
		},
		data: () => ({
			stampper: "",
			hash: "",
			ipfsNode: null,
			isVerifying: false,
			log: [],
			logActions: 0,
			downloadable: false,
			downloadedFile: null,
			showPassword: false,

			rules: {
				required: value => !!value || "Required."
			}
		})
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
