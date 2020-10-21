const abi = require('ethereumjs-abi');

let Timelock = artifacts.require("Timelock");
let Gov = artifacts.require("GovernorAlpha");

module.exports = async (deployer, networks, accounts) => {
    let etaTimestamp = 1603255754; // From queue transaction; Only execute after this timestamp

    let timelock = await Timelock.deployed();
    let gov = await Gov.deployed();
    let txHash = await timelock.executeTransaction(
        timelock.address,
        0,
        "setPendingAdmin(address)",
        abi.rawEncode([ "address" ], [ gov.address ]),
        etaTimestamp
    );

    console.log(txHash);
}
