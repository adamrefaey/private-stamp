let catchRevert = require("./exceptionsHelpers.js").catchRevert;
var ProofOfExistence = artifacts.require("./ProofOfExistence.sol");

contract("ProofOfExistence", function(accounts) {
	const owner = accounts[0];
	const someUser = accounts[1];
	const someHash = "this-is-a-hash";

	beforeEach(async () => {
		instance = await ProofOfExistence.new();
	});

	it("should add a hash to the caller's hashes", async () => {
		await instance.storeHash(someHash, { from: someUser });

		const blockNumber = await instance.verifyHash(someUser, someHash, {
			from: owner
		});

		assert.notEqual(blockNumber, 0);
	});

	it("should log an addition event when a new hash is added", async () => {
		const result = await instance.storeHash(someHash, { from: someUser });

		const eventName = result.logs[0].event;
		const eventData = result.logs[0].args;

		const extpectedEvent = {
			eventName: "LogAdditionEvent",
			stampper: someUser,
			hash: someHash
		};

		assert.equal(
			eventName,
			extpectedEvent.eventName,
			"the LogAdditionEvent should be emitted"
		);
		assert.equal(
			eventData.stampper,
			extpectedEvent.stampper,
			"the stampper should be the msg.sender"
		);
		assert.equal(
			eventData.hash,
			extpectedEvent.hash,
			"the hash should be the uploaded hash"
		);
		assert.notEqual(
			eventData.blockNumber,
			0,
			"the blockNumber should be greater than 0"
		);
	});

	it("should not be able to add a hash that's been added before", async () => {
		await instance.storeHash(someHash, { from: someUser });
		await catchRevert(
			instance.storeHash(someHash, { from: someUser }),
			"This hash has been stored previously!"
		);
	});

	it("should return the block number of a hash that's been stored", async () => {
		await instance.storeHash(someHash, { from: someUser });

		const blockNumber = await instance.verifyHash(someUser, someHash, {
			from: owner
		});

		assert.notEqual(
			blockNumber,
			0,
			"the blockNumber should be greater than 0"
		);
	});

	it("should return `0` if a hash has not been stored", async () => {
		const blockNumber = await instance.verifyHash(someUser, someHash, {
			from: owner
		});

		assert.equal(blockNumber, 0, "the result should equal 0");
	});

	it("should allow the owner to update the appVersion", async () => {
		const newAppVersion = 5;
		await instance.updateAppVersion(newAppVersion, { from: owner });

		const result = await instance.getAppVersion({
			from: owner
		});

		assert.equal(
			result,
			newAppVersion,
			`the appVersion should be ${newAppVersion}`
		);
	});

	it("should not allow anyone who is not the owner to update the appVersion", async () => {
		await catchRevert(
			instance.updateAppVersion(3, { from: someUser }),
			"You must be the owner!"
		);
	});
});
