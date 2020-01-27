const ProofOfExistence = artifacts.require("ProofOfExistence");

module.exports = function(deployer) {
    deployer.deploy(ProofOfExistence);
};
