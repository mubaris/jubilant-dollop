const abi = require('ethereumjs-abi');

let Timelock = artifacts.require("Timelock");
let Gov = artifacts.require("GovernorAlpha");

module.exports = async (deployer, networks, accounts) => {
    let timelock = await Timelock.deployed();
    let gov = await Gov.deployed();
    await timelock.queueTransaction(
        timelock.address,
        0,
        "setPendingAdmin(address)",
        abi.rawEncode([ "address" ], [ gov.address ]),
        12 * 60
    );
}
