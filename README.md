# PrivateStamp (Beta version)

# Currently, under active development

### A private proof-of-existence DApp.

### Prove that you've had a file (of any type & size) at a certain time without compromising your privacy.

`Currently deployed on Rinkeby network`

## Technologies used:

_Solidity_, _Hardhat_, _Typescript_, _Web Crypto API_, _React_, _ChakraUI_

## To interact with the app, you need MetaMask extension installed, and connected to Rinkeby network.

## Features:

### Secure:

- Your original file is never transmitted over the network, both encryption & decryption happen locally.

- Every encryption process generate a different file/hash even if the same file is encrypted with the same password, that's because a random salt is generated every time.

### Decentralized:

- Relies on Ethereum blockchain to store/retrieve data

### Encryption details:

- PBKDF2: this crypto function is used to derive a strong encryption key from the password supplied by the user, to reduce vulnerabilities of brute-force attacks.

- AES-GCM 256: this is the algorithm used to encrypt the file

- Encrypted file contents:
  - "Bytes from `0` to `11`" contain the IV.
  - "Bytes from `12` to `27`" contain the salt.
  - "Bytes from `28` to the end" contain the encrypted contents of the file.
