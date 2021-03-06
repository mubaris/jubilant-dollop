const abi = require('ethereumjs-abi');

let Timelock = artifacts.require("Timelock");
let Gov = artifacts.require("GovernorAlpha");

module.exports = async (deployer, networks, accounts) => {
    let eta = new Date();
    eta.setMinutes(eta.getMinutes() + 12);
    let etaTimestamp = parseInt(eta.getTime() / 1000);

    let timelock = await Timelock.deployed();
    let gov = await Gov.deployed();
    let txHash = await timelock.queueTransaction(
        timelock.address,
        0,
        "setPendingAdmin(address)",
        abi.rawEncode([ "address" ], [ gov.address ]),
        etaTimestamp
    );

    console.log(txHash);
}
