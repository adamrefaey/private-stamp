import ProofOfExistence from "./contracts/ProofOfExistence";

export default {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:9545"
        }
    },
    contracts: [ProofOfExistence],
    events: {
        ProofOfExistence: ["LogAdditionEvent"]
    }
};
