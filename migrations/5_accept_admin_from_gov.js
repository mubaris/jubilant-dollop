let Gov = artifacts.require("GovernorAlpha");

module.exports = async (deployer, networks, accounts) => {
    let gov = await Gov.deployed();

    await gov.__acceptAdmin();
}