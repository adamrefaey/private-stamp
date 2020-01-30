// make Blob from an array of buffers
// and return its url
export function urlFromBlob(blob) {
	return URL.createObjectURL(blob);
}

//convert a string to an array buffer
export function str2ab(str) {
	const buf = new ArrayBuffer(str.length);
	const bufView = new Uint8Array(buf);
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}

	return buf;
}

//generate a random password
export function generatePassword() {
	const usedChars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#_+=";
	let keyArray = new Uint8Array(16); //lenght of the key
	window.crypto.getRandomValues(keyArray); //randomize
	keyArray = keyArray.map(x => usedChars.charCodeAt(x % usedChars.length));

	return String.fromCharCode.apply(null, keyArray);
}

//import key
// import the entered key from the password input
export function importSecretKey(password) {
	const rawPassword = str2ab(password);

	return window.crypto.subtle.importKey(
		"raw", //raw
		rawPassword, // array buffer password
		{
			name: "PBKDF2"
		}, //the algorithm you are using
		false, //whether the derived key is extractable
		["deriveKey"] //limited to the option deriveKey
	);
}

export async function deriveEncryptionSecretKey(password, salt) {
	//derive the secret key from a master key.

	let getSecretKey = await importSecretKey(password);

	return window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt,
			iterations: 80000,
			hash: {
				name: "SHA-512"
			}
		},
		getSecretKey, //your key from importKey
		{
			//the key type you want to create based on the derived bits
			name: "AES-GCM",
			length: 256
		},
		false, //whether the derived key is extractable
		["encrypt", "decrypt"] //limited to the options encrypt and decrypt
	);
}

//file encryption function
export async function encryptFile(
	file,
	password,
	onStart = () => {},
	onFinish = () => {}
) {
	if (!file || !password) {
		throw new Error("File and password are required!");
	} else {
		const salt = window.crypto.getRandomValues(new Uint8Array(16));
		const derivedKey = await deriveEncryptionSecretKey(password, salt); //requiring the key
		const fr = new FileReader(); //request a file read
		fr.readAsArrayBuffer(file); //read the file as buffer

		return new Promise((resolve, reject) => {
			fr.onloadstart = async () => {
				onStart();
			};

			fr.onload = async () => {
				const iv = window.crypto.getRandomValues(new Uint8Array(16)); //generate a random iv
				const content = new Uint8Array(fr.result); //encoded file content
				// encrypt the file
				await window.crypto.subtle
					.encrypt(
						{
							iv,
							name: "AES-GCM"
						},
						derivedKey,
						content
					)
					.then(function(encrypted) {
						//returns an ArrayBuffer containing the encrypted data
						resolve(
							new Blob([iv, salt, new Uint8Array(encrypted)], {
								type: "application/octet-stream"
							})
						);
					})
					.catch(function() {
						reject(
							"An error occured while Encrypting the file, try again!"
						);
					});

				onFinish();
			};
		});
	}
}

//file decryption function
export async function decryptFile(
	file,
	password,
	onStart = () => {},
	onFinish = () => {}
) {
	if (!file || !password) {
		throw new Error("File and password are required!");
	} else {
		const fr = new FileReader(); //request a file read
		fr.readAsArrayBuffer(file); //read the file as buffer

		return new Promise((resolve, reject) => {
			fr.onloadstart = async () => {
				onStart();
			};

			fr.onload = async () => {
				async function deriveDecryptionSecretKey() {
					//derive the secret key from a master key.

					let getSecretKey = await importSecretKey(password);

					return window.crypto.subtle.deriveKey(
						{
							name: "PBKDF2",
							salt: new Uint8Array(fr.result.slice(16, 32)), //get salt from encrypted file.
							iterations: 80000,
							hash: {
								name: "SHA-512"
							}
						},
						getSecretKey, //your key from importKey
						{
							//the key type you want to create based on the derived bits
							name: "AES-GCM",
							length: 256
						},
						false, //whether the derived key is extractable
						["encrypt", "decrypt"] //limited to the options encrypt and decrypt
					);
				}

				const derivedKey = await deriveDecryptionSecretKey(); //requiring the key

				const iv = new Uint8Array(fr.result.slice(0, 16)); //take out encryption iv

				const content = new Uint8Array(fr.result.slice(32)); //take out encrypted content

				await window.crypto.subtle
					.decrypt(
						{
							iv,
							name: "AES-GCM"
						},
						derivedKey,
						content
					)
					.then(function(decrypted) {
						//returns an ArrayBuffer containing the decrypted data
						resolve(
							new Blob([new Uint8Array(decrypted)], {
								type: "application/octet-stream"
							})
						);
					})
					.catch(function() {
						reject("You have entered a wrong Decryption Key!");
					});

				onFinish();
			};
		});
	}
}
