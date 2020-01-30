// add to Ipfs - this can be a string, a Buffer, a stream of Buffers, etc
// returns the hash
export async function addToIpfs(ipfsNode, blob) {
	const files = await ipfsNode.add(blob);

	return files[0].hash;
}

// get from Ipfs
// returns Blob
export async function getFromIpfs(ipfsNode, hash) {
	return new Blob([await ipfsNode.cat(hash)]);
}
