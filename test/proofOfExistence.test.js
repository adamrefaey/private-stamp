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
            hashUploader: someUser,
            hash: someHash
        };

        assert.equal(
            eventName,
            extpectedEvent.eventName,
            "the LogAdditionEvent should be emitted"
        );
        assert.equal(
            eventData.hashUploader,
            extpectedEvent.hashUploader,
            "the hashUploader should be the msg.sender"
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

        assert.equal(
            blockNumber,
            0,
            "the blockNumber should be greater than 0"
        );
    });
});
