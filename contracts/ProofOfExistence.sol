pragma solidity ^0.5.0;

/**
 * @author Mustafa Refaey <mustafarefaey@gmail.com>
 * @dev Implementation of proof of existence contract.
 */
contract ProofOfExistence {
    /// the owner of the contract
    address owner;
    mapping(address => mapping(string => uint256)) private hashes;

    /// an event to be emitted when a new hash has been added
    event LogAdditionEvent(
        address indexed hashUploader,
        uint256 blockNumber,
        string hash
    );



    /// checks if the msg.sender is the owner of the contract
    modifier ownerOnly() {
        require(msg.sender == owner, "You must be the owner!");
        _;
    }

    constructor() public {
        /// set the owner as the contract deployer
        owner = msg.sender;
    }

    /// @notice Stores the hash in the contract's state
    /// @param hash The hash to be stored
    function storeHash(string memory hash) public {
        require(
            hashes[msg.sender][hash] == 0,
            "This hash has been stored previously!"
        );

        hashes[msg.sender][hash] = block.number;

        emit LogAdditionEvent(msg.sender, block.number, hash);
    }

    /// @notice Verifies if the hash exists
    /// @param hashUploader The address of the hash uploader
    /// @param hash The hash to be stored
    /// @return the block number of a hash if it exists in the contract's state
    /// or returns 0
    function verifyHash(address hashUploader, string memory hash)
        public
        view
        returns (uint256)
    {
        return hashes[hashUploader][hash];
    }
}
